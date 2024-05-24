import fs from 'fs/promises';
import { MarkovMachine } from './markov';
import axios from 'axios';
import process from 'process';

const generateText = (text) => {
  let mm = new MarkovMachine(text);
  console.log(mm.makeText());
}

const makeText = async (path) => {
  try {
    const data = await fs.readFile(path, 'utf8');
    generateText(data);
  } catch (err) {
    console.error(`Cannot read file: ${path}: ${err}`);
    process.exit(1);
  }
}

const makeURLText = async (url) => {
  try {
    const resp = await axios.get(url);
    generateText(resp.data);
  } catch (err) {
    console.error(`Cannot read URL: ${url}: ${err}`);
    process.exit(1);
  }
}

export { generateText, makeText, makeURLText };