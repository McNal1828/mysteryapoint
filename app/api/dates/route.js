import { NextResponse } from 'next/server';
import mongoClientPromise from '../mongo';

export const dynamic = 'force-dynamic';

export async function GET(request, { params }) {
  const client = await mongoClientPromise;
  const db = client.db('mysterya');
  const dates = await db.collection('attend').distinct('date', { type: { $ne: 'prac' } });
  return NextResponse.json({ dates });
}
