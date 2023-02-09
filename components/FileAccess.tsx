import { writeAsStringAsync, readAsStringAsync, documentDirectory } from 'expo-file-system';

export async function writePref(path: string, data: string) {
  const fileUri = `${documentDirectory}${path}`;

  try {
    await writeAsStringAsync(fileUri, data);
    console.log('Wrote to',path,': ',data);
  } catch (error) {
    console.error('Error writing to file: ', error);
  }
}

export async function readPref(path: string) {
  const fileUri = `${documentDirectory}${path}`;

  try {
    return await readAsStringAsync(fileUri);
  } catch (error) {
    console.error('Error reading from file: ', error);
  }
}
