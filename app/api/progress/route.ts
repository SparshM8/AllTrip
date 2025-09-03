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
    console.log('📖 Attempting to read progress file...');
    if (fs.existsSync(PROGRESS_FILE)) {
      console.log('✅ File exists, reading...');
      const data = fs.readFileSync(PROGRESS_FILE, 'utf8');
      const parsed = JSON.parse(data);
      console.log('📋 Successfully read and parsed data');
      return parsed;
    } else {
      console.log('❌ File does not exist, returning defaults');
    }
  } catch (error) {
    console.error('❌ Error reading progress data:', error);
  }
  return defaultProgress;
}

// Helper function to write progress data
function writeProgressData(data: any) {
  try {
    console.log('💾 Attempting to write progress data...');
    // Ensure data directory exists
    const dataDir = path.dirname(PROGRESS_FILE);
    console.log('📁 Data directory:', dataDir);
    if (!fs.existsSync(dataDir)) {
      console.log('📂 Creating data directory...');
      fs.mkdirSync(dataDir, { recursive: true });
    }

    console.log('✍️ Writing to file:', PROGRESS_FILE);
    fs.writeFileSync(PROGRESS_FILE, JSON.stringify(data, null, 2));
    console.log('✅ Successfully wrote data to file');

    // Verify the write
    if (fs.existsSync(PROGRESS_FILE)) {
      const verifyData = fs.readFileSync(PROGRESS_FILE, 'utf8');
      console.log('🔍 Verification: File exists and contains data');
    } else {
      console.log('⚠️ Warning: File write verification failed');
    }
  } catch (error) {
    console.error('❌ Error writing progress data:', error);
  }
}

// GET /api/progress - Get current progress data
export async function GET() {
  try {
    console.log('🔍 GET /api/progress called');
    console.log('📁 PROGRESS_FILE path:', PROGRESS_FILE);
    console.log('🌐 Environment:', process.env.NODE_ENV);
    console.log('💾 File exists:', fs.existsSync(PROGRESS_FILE));

    const progressData = readProgressData();
    console.log('📊 Retrieved progress data:', progressData);

    return NextResponse.json(progressData);
  } catch (error) {
    console.error('❌ Error getting progress:', error);
    return NextResponse.json({ error: 'Failed to get progress' }, { status: 500 });
  }
}

// POST /api/progress - Update progress data
export async function POST(request: NextRequest) {
  try {
    console.log('📝 POST /api/progress called');
    const body = await request.json();
    console.log('📨 Received body:', body);

    const currentData = readProgressData();
    console.log('📊 Current data before update:', currentData);

    // Update the data with new values
    const updatedData = {
      ...currentData,
      ...body,
      // Ensure trips array is properly merged
      trips: body.trips || currentData.trips,
    };

    console.log('🔄 Updated data to write:', updatedData);
    writeProgressData(updatedData);

    // Verify the write by reading back
    const verifyData = readProgressData();
    console.log('✅ Data after write verification:', verifyData);

    return NextResponse.json({ success: true, data: updatedData });
  } catch (error) {
    console.error('❌ Error updating progress:', error);
    return NextResponse.json({ error: 'Failed to update progress' }, { status: 500 });
  }
}