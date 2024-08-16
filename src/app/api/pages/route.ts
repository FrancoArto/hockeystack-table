import { NextResponse } from 'next/server';
import pages from './pages.json';

export async function GET(request: Request) {
  return NextResponse.json(pages);
}