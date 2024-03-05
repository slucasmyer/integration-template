import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient, DynamoDBClientConfig } from "@aws-sdk/client-dynamodb";
import { v4 as uuidv4 } from 'uuid';
import { User } from "next-auth";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2023-10-16' });

const ddbDocClient = DynamoDBDocument.from(new DynamoDBClient({
  credentials: {
    accessKeyId: process.env.NEXT_AUTH_AWS_ACCESS_KEY as string,
    secretAccessKey: process.env.NEXT_AUTH_AWS_SECRET_KEY as string,
  },
  region: process.env.NEXT_AUTH_AWS_REGION as string,
}));


export async function getUser(email: string) {
  console.log('GET USER:')
  const params = {
    TableName: process.env.NEXT_AUTH_AWS_USERS_TABLE!,
    IndexName: 'email-index',
    KeyConditionExpression: 'email = :email',
    ExpressionAttributeValues: {
      ':email': email,
    },
  };
  
  const response = await ddbDocClient.query(params);

  if (response.Items && response.Items.length > 0) {
    return response.Items[0] as User;
  } else {
    return null;
  }
}

export async function updateUser(user: any) {
  console.log('UPDATE USER:')
  const params = {
    TableName: process.env.NEXT_AUTH_AWS_USERS_TABLE!,
    Key: { id: user.id },
    UpdateExpression: "set stripeCustomerID = :stripeCustomerID",
    ExpressionAttributeValues: {
      ":stripeCustomerID": user.stripeCustomerID
    },
    ReturnValues: "UPDATED_NEW"
  };
  
  const updatedUser = await ddbDocClient.update(params as any);
  
  return updatedUser;
}

export async function createUser(email: string, name: string, image: string) {
  console.log('CREATE USER:')
  const customer = await stripe.customers.create({ email: email, name: name });
  const user = {
    id: uuidv4(),
    googleID: email,
    email: email,
    name: name,
    image: image,
    stripeCustomerID: customer.id,
  };
  const params = {
    TableName: process.env.NEXT_AUTH_AWS_USERS_TABLE!,
    Item: user
  };
  
  const newUser = await ddbDocClient.put(params);
  console.log('NEW USER:', newUser);
  return user;
}

export async function checkStripeSubscription(customerID: string) {
  console.log('CHECK STRIPE SUBSCRIPTION:')
  const subscriptions = await stripe.subscriptions.list({
    customer: customerID,
  })

  console.log('SUBSCRIPTIONS:', subscriptions);
  const hasActiveSubscription = subscriptions.data.some(
    (subscription) => subscription.status === 'active'
  )
  console.log('hasActiveSubscription:', hasActiveSubscription);
  return hasActiveSubscription;
}
