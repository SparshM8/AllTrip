import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const PROGRESS_FILE = path.join(process.cwd(), 'data', 'progress.json');

// Default progress data
const defaultProgress = {
  trips: [
    {
      image: "/ongoing/trip-to-goa.png",
      title: "Trip to Goa",
      status: "25% completed",
      percentage: 25
    },
    {
      image: "/ongoing/trip-to-himachal.png",
      title: "Trip to Himachal",
      status: "20% completed",
      percentage: 20
    }
  ],
  clickCount: 0,
  globalHighestProgress: 25,
  lastClickTime: 0
};

// Helper function to read progress data
function readProgressData() {
  try {
    if (fs.existsSync(PROGRESS_FILE)) {
      const data = fs.readFileSync(PROGRESS_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error reading progress data:', error);
  }
  return defaultProgress;
}

// Helper function to write progress data
function writeProgressData(data: any) {
  try {
    // Ensure data directory exists
    const dataDir = path.dirname(PROGRESS_FILE);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    fs.writeFileSync(PROGRESS_FILE, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing progress data:', error);
  }
}

// GET /api/progress - Get current progress data
export async function GET() {
  try {
    const progressData = readProgressData();
    return NextResponse.json(progressData);
  } catch (error) {
    console.error('Error getting progress:', error);
    return NextResponse.json({ error: 'Failed to get progress' }, { status: 500 });
  }
}

// POST /api/progress - Update progress data
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const currentData = readProgressData();

    // Update the data with new values
    const updatedData = {
      ...currentData,
      ...body,
      // Ensure trips array is properly merged
      trips: body.trips || currentData.trips,
    };

    writeProgressData(updatedData);

    return NextResponse.json({ success: true, data: updatedData });
  } catch (error) {
    console.error('Error updating progress:', error);
    return NextResponse.json({ error: 'Failed to update progress' }, { status: 500 });
  }
}