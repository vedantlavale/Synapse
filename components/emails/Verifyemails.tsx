import * as React from "react";
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Button,
  Hr,
  Tailwind,
} from "@react-email/components";

interface VerifyEmailProps {
  userEmail: string;
  userEmailVerificationLink: string;
}

const EmailVerification = ({ userEmailVerificationLink }: VerifyEmailProps) => {
  return (
    <Html lang="en" dir="ltr">
      <Tailwind>
        <Head />
        <Body className="bg-gray-100 font-sans py-[40px]">
          <Container className="bg-white rounded-[8px] shadow-sm max-w-[600px] mx-auto p-[40px]">
            <Section>
              <Text className="text-[32px] font-bold text-gray-900 mb-[24px] text-center">
                Verify Your Email Address
              </Text>

              <Text className="text-[16px] text-gray-700 mb-[24px] leading-[24px]">
                Hi there!
              </Text>

              <Text className="text-[16px] text-gray-700 mb-[32px] leading-[24px]">
                Thanks for signing up! To complete your registration and start
                using your account, please verify your email address by clicking
                the button below.
              </Text>

              <Section className="text-center mb-[32px]">
                <Button
                  href={userEmailVerificationLink}
                  className="bg-blue-600 text-white px-[32px] py-[16px] rounded-[8px] text-[16px] font-medium no-underline box-border"
                >
                  Verify Email Address
                </Button>
              </Section>

              <Text className="text-[14px] text-gray-600 mb-[24px] leading-[20px]">
                If the button doesn&apos;t work, you can copy and paste this
                link into your browser:
                <br />
                {userEmailVerificationLink}
              </Text>

              <Text className="text-[14px] text-gray-600 mb-[32px] leading-[20px]">
                This verification link will expire in 24 hours for security
                reasons.
              </Text>

              <Hr className="border-gray-200 my-[32px]" />

              <Text className="text-[12px] text-gray-500 leading-[16px] m-0">
                If you didn&apos;t create an account, you can safely ignore this
                email.
              </Text>
            </Section>


            
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default EmailVerification;
