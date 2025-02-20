import nextPwa from 'next-pwa';

const withPWA = nextPwa({
  dest: 'public', // PWA 관련 파일들이 생성될 디렉토리
  register: true, // 서비스워커 자동 등록
  skipWaiting: true, // 새로운 서비스워커가 즉시 활성화되도록 설정
});

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withPWA(nextConfig);
