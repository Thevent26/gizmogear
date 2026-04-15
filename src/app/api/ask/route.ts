import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const { name, email, category, question } = await req.json();

    if (!name || !email || !category || !question) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('questions')
      .insert({ name, email, category, question })
      .select()
      .single();

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json({ error: 'Failed to save question' }, { status: 500 });
    }

    // Notify via email to ventadmin@agentmail.to
    try {
      const emailRes = await fetch(
        'https://script.google.com/macros/s/AKfycbzR6v8JXZ6eS2Kz3xTZXq9V9Jqy9Z1W8Y7B2cA/exec',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: 'ventadmin@agentmail.to',
            subject: `[GizmoGear Q&A] ${category} — ${name}`,
            body: `New question from ${name} (${email})\nCategory: ${category}\n\n${question}`,
          }),
        }
      );
      if (!emailRes.ok) throw new Error('Email notification failed');
    } catch (emailError) {
      console.error('Email send failed:', emailError);
      // Don't fail the request if email fails
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Ask submission error:', error);
    return NextResponse.json({ error: 'Failed to submit question' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('questions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return NextResponse.json(data || []);
  } catch (error) {
    console.error('Fetch questions error:', error);
    return NextResponse.json({ error: 'Failed to fetch questions' }, { status: 500 });
  }
}
