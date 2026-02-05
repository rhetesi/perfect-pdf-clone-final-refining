 import RobotoRegular from '@/assets/fonts/Roboto-Regular.ttf';
 import RobotoBold from '@/assets/fonts/Roboto-Bold.ttf';
 import RobotoBoldItalic from '@/assets/fonts/Roboto-BoldItalic.ttf';
 import { jsPDF } from 'jspdf';
 
 const loadFontAsBase64 = async (url: string): Promise<string> => {
   const response = await fetch(url);
   const blob = await response.blob();
   return new Promise((resolve, reject) => {
     const reader = new FileReader();
     reader.onloadend = () => {
       const base64 = (reader.result as string).split(',')[1];
       resolve(base64);
     };
     reader.onerror = reject;
     reader.readAsDataURL(blob);
   });
 };
 
 export const addRobotoFonts = async (doc: jsPDF): Promise<void> => {
   const [regularBase64, boldBase64, boldItalicBase64] = await Promise.all([
     loadFontAsBase64(RobotoRegular),
     loadFontAsBase64(RobotoBold),
     loadFontAsBase64(RobotoBoldItalic),
   ]);
 
   doc.addFileToVFS('Roboto-Regular.ttf', regularBase64);
   doc.addFont('Roboto-Regular.ttf', 'Roboto', 'normal');
 
   doc.addFileToVFS('Roboto-Bold.ttf', boldBase64);
   doc.addFont('Roboto-Bold.ttf', 'Roboto', 'bold');
 
   doc.addFileToVFS('Roboto-BoldItalic.ttf', boldItalicBase64);
   doc.addFont('Roboto-BoldItalic.ttf', 'Roboto', 'bolditalic');
 };