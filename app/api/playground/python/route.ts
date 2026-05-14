import { NextRequest, NextResponse } from 'next/server';
import { spawn } from 'child_process';

export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json();

    if (!code || typeof code !== 'string') {
      return NextResponse.json({ error: 'Code is required' }, { status: 400 });
    }

    // Run the Python code
    const output = await runPythonCode(code);

    return NextResponse.json({ output });
  } catch (error) {
    console.error('Error running Python code:', error);
    return NextResponse.json({ error: 'Failed to run code' }, { status: 500 });
  }
}

function runPythonCode(code: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const python = spawn('python', ['-c', code], { stdio: ['pipe', 'pipe', 'pipe'] });

    let stdout = '';
    let stderr = '';

    python.stdout.on('data', (data) => {
      stdout += data.toString();
    });

    python.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    python.on('close', (code) => {
      if (code === 0) {
        resolve(stdout);
      } else {
        resolve(stderr || `Process exited with code ${code}`);
      }
    });

    python.on('error', (error) => {
      reject(error);
    });

    // Set a timeout to prevent infinite loops
    setTimeout(() => {
      python.kill();
      resolve('Code execution timed out');
    }, 10000); // 10 seconds
  });
}
