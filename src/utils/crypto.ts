// src/utils/crypto.ts
import CryptoJS from 'crypto-js';

/**
 * 비밀번호를 2단계로 암호화합니다.
 * 1. SHA-512로 1차 암호화
 * 2. 1차 암호화된 비밀번호 뒤에 Salt를 붙인 후 AES-128-ECB로 2차 암호화
 * 
 * @param password - 원본 비밀번호
 * @param cubeToken - 서버에서 받은 cube_token (첫 번째 부분을 salt로 사용)
 * @param aesKey - AES 암호화에 사용할 키 (16바이트)
 * @returns 최종 암호화된 비밀번호
 */
export const hashPassword = (password: string, cubeToken: string, aesKey?: string): string => {
    // 환경 변수에서 AES 키 가져오기 (없으면 기본값 사용)
    const finalAesKey = aesKey || process.env.NEXT_PUBLIC_AES_KEY || 'nexus6@$)2%*';

    console.log('\n=== 비밀번호 암호화 시작 ===');

    // cube_token에서 첫 번째 부분 추출 (salt로 사용)
    const salt = cubeToken.split('-')[0];
    console.log('[준비] Salt 추출:', salt);

    // Step 1: SHA-512로 1차 암호화 (원본 비밀번호만)
    const sha512Hash = CryptoJS.SHA512(password);
    const sha512String = sha512Hash.toString(CryptoJS.enc.Hex);
    console.log('[1단계] SHA-512 암호화 완료');

    // Step 2: 1차 암호화된 password 뒤에 salt를 붙이고 AES-128-ECB로 2차 암호화
    const passwordWithSalt = sha512String + salt;
    console.log('[2단계] SHA-512 결과에 Salt 추가');

    // AES 키 준비 및 암호화
    const keyWordArray = CryptoJS.enc.Utf8.parse(finalAesKey.padEnd(16, '0').substring(0, 16));
    const dataWordArray = CryptoJS.enc.Utf8.parse(passwordWithSalt);

    const encrypted = CryptoJS.AES.encrypt(dataWordArray, keyWordArray, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });

    const encryptedBase64 = encrypted.toString();
    console.log('[2단계] AES-128-ECB 암호화 완료');
    console.log('✅ 최종 암호화된 비밀번호:', encryptedBase64);
    console.log('=== 암호화 완료 ===\n');

    return encryptedBase64;
};

/**
 * 비밀번호를 SHA-512로 단순 해싱합니다. (salt 없이)
 * @param password - 원본 비밀번호
 * @returns 해싱된 비밀번호 (hex string)
 */
export const simpleHashPassword = (password: string): string => {
    const hash = CryptoJS.SHA512(password);
    const hashString = hash.toString(CryptoJS.enc.Hex);
    console.log('[단순 해싱] SHA-512 완료');
    return hashString;
};

/**
 * SHA-256으로 해싱 (이전 버전 호환용)
 */
export const sha256Hash = (password: string, salt: string): string => {
    const saltedPassword = salt + password;
    const hash = CryptoJS.SHA256(saltedPassword);
    return hash.toString(CryptoJS.enc.Hex);
};

/**
 * 문자열을 Base64로 인코딩합니다.
 * @param text - 인코딩할 문자열
 * @returns Base64 인코딩된 문자열
 */
export const encodeBase64 = (text: string): string => {
    const wordArray = CryptoJS.enc.Utf8.parse(text);
    const base64 = CryptoJS.enc.Base64.stringify(wordArray);

    console.log('[Crypto] Base64 encoded:', base64);

    return base64;
};

/**
 * Base64 문자열을 디코딩합니다.
 * @param base64 - Base64 인코딩된 문자열
 * @returns 디코딩된 문자열
 */
export const decodeBase64 = (base64: string): string => {
    const wordArray = CryptoJS.enc.Base64.parse(base64);
    const decoded = CryptoJS.enc.Utf8.stringify(wordArray);

    console.log('[Crypto] Base64 decoded:', decoded);

    return decoded;
};

/**
 * AES-128-ECB로 데이터를 복호화합니다.
 * @param encryptedData - 암호화된 데이터 (Base64)
 * @param aesKey - AES 복호화에 사용할 키 (16바이트)
 * @returns 복호화된 문자열
 */
export const decryptAES = (encryptedData: string, aesKey?: string): string => {
    const finalAesKey = aesKey || process.env.NEXT_PUBLIC_AES_KEY || 'nexus6@$)2%*';

    const keyWordArray = CryptoJS.enc.Utf8.parse(finalAesKey.padEnd(16, '0').substring(0, 16));

    const decrypted = CryptoJS.AES.decrypt(encryptedData, keyWordArray, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });

    const decryptedString = decrypted.toString(CryptoJS.enc.Utf8);
    console.log('[복호화] AES-128-ECB 복호화 완료');

    return decryptedString;
};