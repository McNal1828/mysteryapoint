import { NextRequest, NextResponse } from 'next/server';
import mongoClientPromise from '../mongo';
import { MongoClient } from 'mongodb';

export const dynamic = 'force-dynamic';

/**
 *
 * @param {NextRequest} request
 */
export async function GET(request, { params }) {
  const searchParams = request.nextUrl.searchParams;
  const date = searchParams.get('date');
  /**
   * @type {MongoClient}
   */
  const client = await mongoClientPromise;
  const db = client.db('mysterya');
  const attend = await db.collection('attend').findOne({ date: new Date(date) });

  return NextResponse.json({ attend: attend.members });
}
/**
 *
 * @param {NextRequest} request
 */
export async function POST(request, { params }) {
  const data = await request.json();
  const formattedData = { ...data, date: new Date(data.date) };
  /**
   * @type {MongoClient}
   */
  const client = await mongoClientPromise;
  const db = client.db('mysterya');
  await db.collection('attend').updateOne(
    { date: new Date(data.date) }, // 필터 조건
    { $set: formattedData }, // 업데이트할 데이터
    { upsert: true } // 문서가 없으면 새로 추가
  );

  // 전달받은 backnumber에 해당하는 문서들을 처리
  for (const member of data.members) {
    const { backnumber, name } = member;
    // backnumber가 없는 문서 추가
    const existingDoc = await db.collection('casspoint').findOne({ backnumber, date: new Date(data.date) });
    if (!existingDoc) {
      await db.collection('casspoint').insertOne({
        date: new Date(data.date),
        type: data.type,
        backnumber,
        name,
        attack: [],
        defense: [],
        normal: [{ title: '참석', point: 25 }],
      });
    }
  }
  const backnumbers = data.members.map((member) => member.backnumber);
  // backnumber가 있지만 해당 date가 아닌 문서 삭제
  await db.collection('casspoint').deleteMany({
    date: new Date(data.date),
    backnumber: { $nin: backnumbers }, // backnumber가 전달받은 리스트에 없는 문서 삭제
  });

  return NextResponse.json({ message: '저장완료' }, { status: 201 });
}
