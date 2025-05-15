import fs from 'fs';
import path from 'path';

export interface OutsideLink {
  title: string;
  link: string;
}

export function getOutsideLinks(): OutsideLink[] {
  try {
    // 读取JSON文件
    const filePath = path.join(process.cwd(), 'src/data/outside-link.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    
    // 将JSON字符串解析为对象
    const links = JSON.parse(fileContents) as OutsideLink[];
    
    return links;
  } catch (error) {
    console.error('Failed to load outside links:', error);
    return [];
  }
} 