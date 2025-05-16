import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export async function uploadToIPFS(file: File): Promise<string> {
  try {
    const storage = getStorage();
    const storageRef = ref(storage, `uploads/${Date.now()}_${file.name}`);
    
    const snapshot = await uploadBytes(storageRef, file);
    const url = await getDownloadURL(snapshot.ref);
    return url;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
}

export async function storeJson(data: object, fileName: string = 'data.json'): Promise<string> {
  try {
    const storage = getStorage();
    const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
    const file = new File([blob], fileName);
    
    const storageRef = ref(storage, `json/${Date.now()}_${fileName}`);
    const snapshot = await uploadBytes(storageRef, file);
    const url = await getDownloadURL(snapshot.ref);
    return url;
  } catch (error) {
    console.error('Error storing JSON:', error);
    throw error;
  }
}
