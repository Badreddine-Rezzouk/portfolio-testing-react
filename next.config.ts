import type { NextConfig } from "next";

import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin(
  './src/i18n/request.ts'
);

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ['9af0-2a01-e0a-86b-6410-566c-4026-7da5-8033.ngrok-free.app'],
};

export default withNextIntl(nextConfig);
