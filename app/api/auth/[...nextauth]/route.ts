import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials"
import { signInUrl } from "@/common/utils/network/endpoints";
import { parseObjectPropertiesToCamelCase } from "@/common/utils/helpers";
import { handleResponse } from "@/common/utils/network/responseHandler";
import { httpRequestMethods } from "@/common/utils/network/constants";

const { POST } = httpRequestMethods;

const OPTIONS: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Sign in',
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "email@domain.com",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      type: 'credentials',
      async authorize (credentials) {
        const res = await fetch(signInUrl, {
          method: POST,
          body: JSON.stringify(credentials),
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
        });
        const {
          code, response,
        } = await handleResponse(res);
        const user = response;
        if (code === 200 && user) {
          return parseObjectPropertiesToCamelCase(user.data);
        }
        return null
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt ({
      token, user,
    }) {
      if (user) {
        return {
          ...token,
          token: user.token,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        };
      }
      return token;
    },
    async session ({
      session, token,
    }) {
      if (token) {
        session.token = token.token as string;
        session.user.email = token.email as string;
        session.user.firstName = token.firstName as string;
        session.user.lastName = token.lastName as string;
      }
      return session;
    },
  },
  pages:{
    signIn: '/account/signin',
    signOut: '/account/signout',
  },
};

const handler = NextAuth(OPTIONS);

export {
  handler as GET, handler as POST,
};
