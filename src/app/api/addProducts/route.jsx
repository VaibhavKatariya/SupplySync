// app/api/addProduct/route.js (or .ts if using TypeScript)

import { NextResponse } from 'next/server';
import admin from 'firebase-admin';
import { firestoreAdmin } from '@/lib/firebaseAdmin'; // Adjust path as needed

export async function POST(request) {
  try {
    // Check authorization
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split('Bearer ')[1];
    const decodedToken = await admin.auth().verifyIdToken(token);
    const userId = decodedToken.uid;

    // Parse request body
    const { name, category, price, stock } = await request.json();
    if (!name || !category || !price || !stock) {
      return NextResponse.json({ message: 'Missing product data' }, { status: 400 });
    }

    // Add product to Firestore
    const productRef = firestoreAdmin.collection(`products/${userId}/userProducts`).doc();
    await productRef.set({
      name,
      category,
      price,
      stock,
      createdAt: new Date(),
    });

    return NextResponse.json({ message: 'Product added successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error adding product:', error);
    return NextResponse.json({ message: 'Failed to add product' }, { status: 500 });
  }
}