import { NextRequest, NextResponse } from 'next/server';
import { msftGraphClient } from '@/lib/msftGraphClient';

export async function POST(request: NextRequest) {
  try {
    const client = msftGraphClient();
    const body = JSON.parse(await request.text());
    const { socialUserId, socialProvider } = body;

    if (!socialUserId || !socialProvider) {
      return NextResponse.json({ error: 'Missing required parameters.' }, { status: 400 });
    }

    // Search for the user by the social identity
    const searchResult = await client
      .api('/users')
      .filter(`identities/any(c:c/issuerAssignedId eq '${socialUserId}' and c/issuer eq '${socialProvider}')`)
      .get();

    let userId;

    if (searchResult && searchResult.value && searchResult.value.length > 0) {
      // User exists, update if necessary
      userId = searchResult.value[0].id;
      // Update user logic here, if needed
    } else {
      // User does not exist, create a new user
      const newUser = {
        // Add user attributes here
        identities: [
          {
            signInType: 'federated',
            issuer: socialProvider,
            issuerAssignedId: socialUserId,
          },
        ],
      };

      const createdUser = await client.api('/users').post(newUser);
      userId = createdUser.id;
    }

    return NextResponse.json({ success: true, userId });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 400 });
  }
}
