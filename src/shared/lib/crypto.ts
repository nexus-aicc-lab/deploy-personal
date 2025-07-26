// src/utils/crypto.ts
import CryptoJS from 'crypto-js';

/**
 * 1차: SHA-512로 비밀번호 해싱
 * @param password - 원본 비밀번호
 * @returns SHA-512 해시 (hex string)
 */
export const firstStepHash = (password: string): string => {
    const hash = CryptoJS.SHA512(password);
    return hash.toString(CryptoJS.enc.Hex);
};

/**
 * 2차: Salt를 앞에 붙이고 AES-128-ECB로 암호화 후 Hex 인코딩
 * @param hashedPassword - 1차 암호화된 비밀번호
 * @param salt - Salt 값
 * @param aesKey - AES 키 (16바이트)
 * @returns AES 암호화 후 Hex 인코딩된 문자열
 */
export const secondStepEncrypt = (
    hashedPassword: string,
    salt: string,
    aesKey: string
): string => {
    // Salt를 해시된 비밀번호 앞에 붙임
    const saltedData = salt + hashedPassword;

    // AES 키를 16바이트로 조정
    const keyWordArray = CryptoJS.enc.Utf8.parse(aesKey.padEnd(16, '0').substring(0, 16));

    // 데이터를 WordArray로 변환
    const dataWordArray = CryptoJS.enc.Utf8.parse(saltedData);

    // AES-128-ECB 암호화
    const encrypted = CryptoJS.AES.encrypt(dataWordArray, keyWordArray, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });

    // 암호화된 결과를 Hex로 인코딩
    return encrypted.ciphertext.toString(CryptoJS.enc.Hex);
};

/**
 * 비밀번호 2단계 암호화 통합 함수
 * 1차: SHA-512 해싱
 * 2차: Salt 추가 + AES-128-ECB 암호화 + Hex 인코딩
 * 
 * salt는 /cubetoken에서 받은 cube_token의 첫 번째 부분(하이픈 기준)을 사용
 * 
 * @param password - 원본 비밀번호
 * @param cubeToken - 서버에서 받은 cube_token (예: "53dd2e2e-78806191-df98802b-8838c9b6")
 * @param aesKey - AES 암호화 키
 * @returns 최종 암호화된 비밀번호 (Hex string)
 */

export const encryptPassword = (
    password: string,
    cubeToken: string,
    aesKey: string = 'nexus6@$)2%*)'
): string => {
    console.log('\n========== 비밀번호 2단계 암호화 시작 ==========');
    console.log('[입력] 원본 비밀번호:', password);
    console.log('[입력] Cube Token:', cubeToken);
    console.log('[입력] AES Key:', aesKey);

    // cube_token에서 첫 번째 부분을 salt로 추출 (하이픈 기준)
    const salt = cubeToken.split('-')[0];
    console.log('[추출] Salt:', salt);

    // 1차 암호화: SHA-512
    console.log('\n[1차 암호화] SHA-512 해싱...');
    const hashedPassword = firstStepHash(password);
    console.log('SHA-512 결과:', hashedPassword);
    console.log('해시 길이:', hashedPassword.length);

    // 2차 암호화: Salt + AES-128-ECB + Hex
    console.log('\n[2차 암호화] Salt 추가 + AES-128-ECB 암호화...');
    console.log('Salt + Hash (앞 50자):', (salt + hashedPassword).substring(0, 50));

    const finalEncrypted = secondStepEncrypt(hashedPassword, salt, aesKey);

    console.log('\n========== 암호화 완료 ==========');
    console.log('✅ 최종 암호화 결과 (Hex):', finalEncrypted);
    console.log('최종 결과 길이:', finalEncrypted.length);
    console.log('=====================================\n');

    return finalEncrypted;
};

/**
 * Cube Token에서 Salt 추출
 * @param cubeToken - 전체 cube_token
 * @returns salt 값 (첫 번째 하이픈 이전 부분)
 */
export const extractSaltFromToken = (cubeToken: string): string => {
    return cubeToken.split('-')[0];
};