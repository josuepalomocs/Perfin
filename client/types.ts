export interface PerfinRequestCredential {
  idToken: string;
  uid: string;
}

export interface LinkToken {
  id: string;
  value: string;
  expirationDate: string;
  bearerUid: string;
}
