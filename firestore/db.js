const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert({
    type: "service_account",
    project_id: "discordbot-24633",
    private_key_id: "35d158c55ad9818a96df39c7a5ef44847043ee31",
    private_key:
      "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC1Nb8HvXV+ngIP\nQU4djU9YRj6LXZZD5lKeO6DRgMInvhniJjdvo272KCeG+USCRyE0a5mSulC1ixDq\nUpkrveOXtdsHhVbkSngkFL1Kg+9Vj1PGFTwHSu9g6lT0BEMLEWHMGyEed7I31g0q\naLwShRVwCdcaiEKq5dw46VaUJC7RPcvuYY0hZYmEZ6YGT+2xg4hu+o26A+DuSQ7h\nsWprDgjEXaSGe8+X0X8P20Uvh+piFZczcM4PwbpYR5nmwmyIQgV+1vsMalZREeaj\n9CvU0ijV5xchdZRmFrlPcxj5aT7ci2U/eDCqWE8bim+5fw9+I2z59LWhQAf5qoa8\nimerwWVRAgMBAAECggEAQFSeRr8p0RODI6tJchBSlMILPiqxR9Wiiu4cP4P4aWeB\nhNmQYJ+iqtzCe5ZOjfl2fkecs4xVTr3Z+XXtTqwQ+jDjWx4pJM6TLCv4r1V7R+Kk\nGPQ85VHi/YLzOdWxf2JiV7Vh4pEXwd7Jub6I1gJNBANaS98H2+fScJnV1K2ruTgg\nGkfKtGO7fJ7tzpFJjRXtxRPsTrjhRdu/ACdmtsCch841YvYo1wVx52rPoP0cD/lf\nQmly2P5Q5W/4tQtz+3USYSx40c82Q/6oj9rWVh3hkET0VNSD4VKSwO3/s9jNHv4x\nzL/0gQGU5lHyyZ4DmQs/L9qti9+Nl6YMX7tZMAZk6QKBgQDYJaIXNvMqeKI0AEfV\nBiXEhYUW3WlALT2Ie3KstBfgLKZymFPfXgGtQfQyfwqoa3M0+wE/yzQcPRYJRoNw\nLGpRBZyGK4S1cXjrkFZDtfFIYZRXrkY1YJChHSCnmSYIyym9fSTD45odvoAJfFmn\nsPs+g9dhm2O4q8L47gEqzqSTCwKBgQDWnwwIKwfW/69pjoDHJ1sX1UhKwP62gp+v\nM0YgK2H0H/iKcvKH9/zVmhd/W+kkrtsUmzyNmkyXC35X8spGVYmEpqmAL8oY/i0f\nGGu66Lfnie2DER2JyB7+br5EX+1Jp+P337UCYxM/mkZmBgiKsRyPQVhEkYA4Ewqc\nHQOJ+xyikwKBgQCvuBCJbOvNCFtdiSjcnu3PUXj8OK4bNWxD65AzpQmP/tymZv4w\npj0YvHipIKzqdMgpNzIxyaIonuSuT7wFUqZwDe7NCM4PsBtM7n+i9mQcou+1RIHh\nXQrXYFWuywuntHrPiNB9zCf7rGZsz8IXWQM4NHjB6lDszf5o3xzlzy7uNwKBgHEB\n1ggHAF3Iy8g87Lnwkxp9h081R+k55nMOAIK31SACJZBg7iuB/HNMa8r3zk8uctTq\n2HuHH4T43FHa2X8nUv2x89Y3U6bNT1zsMu171DnqelFlFbSS1x8JmM3P5NW/vV2r\nQVg8aso2pZLa4myEzZDwy1Vvd6APBqsk69QfkPhZAoGBAK98VC8ZFW4/6MYua+8r\nZ6jOrQifQf3KKCOOFKBw9QjqCkbDxao0OPSZdI9RXFz39mPcEW6qpAUBsXHG/zWR\nvDZvlrHWGyi1n6wUk3stbm9EcC+OlZIXQzfj4l+a9iMqnMO4uRjhSzTu+OtYQyYM\n5wZw9FJTdtcsmXM9MUkNRlMc\n-----END PRIVATE KEY-----\n",
    client_email:
      "firebase-adminsdk-1v6oz@discordbot-24633.iam.gserviceaccount.com",
    client_id: "100306284988473211795",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url:
      "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-1v6oz%40discordbot-24633.iam.gserviceaccount.com",
  }),
});

const db = admin.firestore();

module.exports = db;
