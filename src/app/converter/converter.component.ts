import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.css']
})
export class ConverterComponent implements OnInit {
  // Declare a variable to store the user input paragraph
  paragraph: any;
  result: any;
  // Declare a variable to store the json file data
  data: any;

  // Inject HttpClient service as a dependency
  constructor(private http: HttpClient) { }

  // Load the json file data when the component is initialized
  ngOnInit(): void {
    this.http.get('assets/words.json').subscribe(res => {
      this.data = res;
    });
  }

  // Define a function to convert specific words into the desired words from the json file
  convert(): void {
    // Split the paragraph into an array of words
    this.paragraph = this.paragraph.toLowerCase();
    let words = this.paragraph.split(' ');

    // Loop through each word in the array
    for (let i = 0; i < words.length; i++) {
      // Remove any punctuation marks from the word
      let word = words[i].replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '');

      //console.log(typeof word);
      let value = typeof word;
  if (typeof value === "string") {
    value = word; // prints "hello" and "world"
  }
      word = word.toLowerCase();
      // Check if the word exists as a key in the json file data
      if (this.data[word]) {
        // Replace the word with its corresponding value from the json file data
        words[i] = words[i].replace(word, this.data[word]);
      }
    }

    // Join the array of words back into a paragraph
    this.result = words.join(' ');
  }
}
