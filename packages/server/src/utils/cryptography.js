import crypto from 'crypto'
import {AES_32KEY, AES_256_CBC} from '../configs'

export  const encrypt = (text) => {
    const iv = crypto.randomBytes(16)    
    let cipher = crypto.createCipheriv(AES_256_CBC, Buffer.from(AES_32KEY), iv)
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()])
    return { 
        iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') 
    }
}

export const decrypt = (text) => {
    let iv = Buffer.from(text.iv, 'hex')
    let encryptedText = Buffer.from(text.encryptedData, 'hex');
    let decipher = crypto.createDecipheriv(AES_256_CBC, Buffer.from(AES_32KEY), iv)
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString()
}