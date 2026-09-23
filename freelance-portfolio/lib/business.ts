export const business = {
  registrationName:
    process.env.NEXT_PUBLIC_BUSINESS_REGISTRATION_NAME?.trim() ||
    "Aarush Gupta",
  publicName: "Aarush Gupta",
  email: "aarushgupta707.2@gmail.com",
  location: "India",
  services: [
    "Web development",
    "App development",
    "AI and machine learning",
    "AI automation and integrations",
  ],
} as const;
