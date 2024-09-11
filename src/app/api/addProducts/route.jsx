import { NextResponse } from 'next/server';
import admin from 'firebase-admin';
import { firestoreAdmin } from '@/lib/firebaseAdmin'; // Adjust path as needed

export async function POST(request) {
  try {
    // Console log environment variables for debugging
    console.log('Environment Variables:', {
      FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
      FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY ? 'Exists' : 'Not Found',
      FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL,
    });

    // Check for Authorization header
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.error('Unauthorized: Missing or invalid Authorization header');
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split('Bearer ')[1];

    // Verify the Firebase ID token
    let decodedToken;
    try {
      decodedToken = await admin.auth().verifyIdToken(token);
    } catch (authError) {
      console.error('Error verifying Firebase token:', authError);
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }

    const userId = decodedToken.uid;

    // Parse request body and validate fields
    let productData;
    try {
      productData = await request.json();
    } catch (jsonError) {
      console.error('Error parsing JSON:', jsonError);
      return NextResponse.json({ message: 'Invalid JSON' }, { status: 400 });
    }

    const { name, category, price, stock } = productData;

    if (!name || !category || !price || !stock) {
      console.error('Missing required product data:', { name, category, price, stock });
      return NextResponse.json({ message: 'Missing product data' }, { status: 400 });
    }

    // Add product to Firestore
    try {
      const productRef = firestoreAdmin.collection(`products/${userId}/userProducts`).doc();
      await productRef.set({
        name,
        category,
        price,
        stock,
        createdAt: new Date(),
      });
      console.log('Product added successfully:', { name, category, price, stock });
    } catch (firestoreError) {
      console.error('Error adding product to Firestore:', firestoreError);
      return NextResponse.json({ message: 'Failed to add product and firstore error is: ' + firestoreError }, { status: 500 });
    }

    return NextResponse.json({ message: 'Product added successfully' }, { status: 200 });
  } catch (error) {
    console.error('Unexpected error in POST /addProduct:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
