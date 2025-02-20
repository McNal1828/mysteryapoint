import { NextResponse } from 'next/server';
import mongoClientPromise from '../mongo';
import { MongoClient, ObjectId } from 'mongodb';

export const dynamic = 'force-dynamic';

export async function GET(request, { params }) {
  const searchParams = request.nextUrl.searchParams;
  const date = searchParams.get('date');
  /**
   * @type {MongoClient}
   */
  const client = await mongoClientPromise;
  const db = client.db('mysterya');
  if (date) {
    const data = await db
      .collection('casspoint')
      .find({ date: new Date(date) })
      // .find({})
      .toArray();
    return NextResponse.json({ data });
  } else {
    const data = await db
      .collection('casspoint')
      .find()
      // .find({})
      .toArray();
    return NextResponse.json({ data });
  }
}

export async function POST(req, { params }) {
  try {
    const requestData = await req.json(); // JSON 배열 받기
    /**
     * @type {MongoClient}
     */
    const client = await mongoClientPromise;
    const db = client.db('mysterya');
    const collection = db.collection('casspoint');
    const bulkOperations = requestData.map((item) => {
      const { _id, date, ...newData } = item;
      return {
        updateOne: {
          filter: { _id: new ObjectId(item._id) }, // _id 기준 찾기
          update: { $set: newData }, // 문서 업데이트
          upsert: false, // 해당 _id가 없으면 무시
        },
      };
    });
    const result = await collection.bulkWrite(bulkOperations);
    return NextResponse.json({ message: '수정성공' }, { status: '201' });
  } catch (error) {
    return NextResponse.json({ message: '서버오류' }, { status: '500' });
  }
}
