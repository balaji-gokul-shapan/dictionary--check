// import React, { useState, useRef, useEffect } from 'react';
// import axios from 'axios';
// import { Popover, List, ListItem, Typography } from '@mui/material';
// import { InputBoxContainer, SuggestionPopUp } from '../../styles/pages/Index';

// export const Grammer = () => {
//   const [value, setValue] = useState([]);
//   const contentEditableRef = useRef(null);
//   const [popoverAnchor, setPopoverAnchor] = useState(null); //popover
//   const [result, setResult] = useState(null); // filter result
//   const [selWord, setSelWord] = useState('');
//   const [coords, setCoords] = useState({ x: 0, y: 0 });
//   const [showPopup, setShowPopup] = useState(false);
//   const [errWord, setErrWord] = useState('');
// const [errorHighLightWord, setErrorHighLightWord] = useState("");
//   // useEffect(() => {
//   //   moveCursorToEnd();
//   // }, [value]);

//   useEffect(() => {
//     if (contentEditableRef.current) {
//       contentEditableRef.current.focus();
//       const selection = window.getSelection();
//       selection.selectAllChildren(contentEditableRef.current);
//       selection.collapseToEnd();
//     }
//   });

//   const openPopover = Boolean(popoverAnchor);
//   const handlePopoverClose = () => setPopoverAnchor(null);
//   const handleMouseMove = (event) => {
//     setCoords({ x: event.clientX, y: event.clientY });
//   };

//   const handleMouseEnter = () => setShowPopup(true);
//   const handleMouseLeave = () => setShowPopup(false);

//   const moveCursorToEnd = () => {
//     const element = contentEditableRef.current;
//     const range = document.createRange();
//     const selection = window.getSelection();

//     range.selectNodeContents(element);
//     range.collapse(false);

//     selection.removeAllRanges();
//     selection.addRange(range);

//     element.focus();
//   };

//   const handlePopoverOpen = (event, word, errWords, spellCheckData) => {
//     setPopoverAnchor(event.currentTarget);
//     console.log(errWords);
//     setResult(spellCheckData.filter((item) => item.correct === word));
//     setSelWord(word);
//   };

//   // let timeoutId;
//   const onChange = (e) => {
//     let updatedText = e.target.innerHTML;
//     // const updatedText = e.target.textContent.split('').reverse().join('');
//     console.log(updatedText);
//     // const lastWord = updatedText.substring(updatedText.lastIndexOf(" ")+1);
//     // console.log(lastWord);
//     setValue(updatedText);
//     performSpellCheck(updatedText);
//   };

//   const handleKeyPress = (e) => {
//     const key = e.key;
//     const code = e.code.slice(-1);
//     // console.log(code);

//     let updatedText = contentEditableRef.current.innerText
//     console.log('updatedText: ', updatedText);

//     const words = [];
//     if (updatedText.trim() !== '') {
//       words.push(...updatedText.trim().split(' '));
//     }
//     console.log(words)
//         // console.log(`words: ${JSON.stringify({words})}`);
//     const wordsAll =  updatedText.split(' ')
//     console.log('wordsAll: ', wordsAll);

//     const lastWord = wordsAll[wordsAll.length - 1];
//     console.log('lastWord:', lastWord);

//     const updatedTextLast = updatedText.slice(-1);
//     // console.log('updatedTextLast:---------- ', updatedTextLast);
//      // const words = value?.split(" ");
//      // const lastWord = words[words?.length - 1];
//     // console.log(lastWord)
// //     if ((key == 'Backspace' || key=='Delete') && appendedText != '')  {
//     // const appendedText = typeof  value === 'object' ? value.concat(lastWord) : updatedText;
//     const appendedText = typeof  value === 'object' ? lastWord : updatedText;
//     console.log('appendedText',appendedText)
//     if (key === ' ' && key !== 'Backspace' ) {
//       performSpellCheck(appendedText);
//     }
// console.log(value);
//     /* const appendedText = typeof value === 'object' ? setValue(value.concat(code))  : updatedText;
//     console.log('value.concat(updatedText): ', value.concat(code));

//     console.log('appendedText', appendedText);
//     // console.log(value.concat(key),"-----------",updatedText);
//     console.log(value); */
//     //setValue(appendedText);

//     //     const appendedText = value.concat(key)
//     setValue(updatedText);

//   };

//   // const onChange = (e) => {
//   //   if (contentEditableRef.current) {
//   //     contentEditableRef.current.focus();
//   //     const selection = window.getSelection();
//   //     selection.selectAllChildren(contentEditableRef.current);
//   //     selection.collapseToEnd();
//   //   }

//   //   let updatedText = e.target.textContent;
//   //   console.log(updatedText);
//   //   // performSpellCheck(updatedText);
//   //   setValue(updatedText);

//   // };
// const handleChange = (event) => {
//   const updatedText = event.target.value;
//   console.log('updatedText:', updatedText);

//   const wordsAll = updatedText.split(' ');
//   console.log('wordsAll:', wordsAll);

//   const lastWord = wordsAll[wordsAll.length - 1];
//   console.log('lastWord:', lastWord);

//   const appendedText = typeof value === 'object' ? lastWord : updatedText;
//   console.log('appendedText:', appendedText);

//   if (event.target.value.endsWith(' ')) {
//     performSpellCheck(lastWord);
//   }

//   setValue(appendedText);
// };
//   const performSpellCheck = async (text) => {
//     try {
//       const response = await axios.post(
//         'https://api.textgears.com/spelling',
//         {
//           text: text,
//           language: 'en-US',
//         },
//         {
//           params: {
//             key: 'E4K0g121615fwyR3',
//           },
//         }
//       );
//       const spellCheckResult = response.data;
//       const spellCheckData = spellCheckResult?.response.errors.map((match) => {
//         return {
//           message: match.description,
//           offset: match.offset,
//           length: match.length,
//           word: match.better,
//           type: match.type,
//           correct: match.bad,
//         };
//       });
//       console.log(spellCheckData);

//       const errWords = spellCheckData.map((error) => error.correct);
//       setErrWord(errWords);

//       // const hasErrWord = errWords.map((item) => item);
//       // console.log('hasErr', hasErrWord);

//       // const lastWord = text.substring(text.lastIndexOf(' ') + 1);
//       // // console.log('lastword', lastWord);

//       // const errorPara = errWords.some((errorWord) => text.includes(errorWord));
//       // console.log(errorPara);

//       // console.log(hasErrWord.includes(lastWord));
//       updatedChekedWords(errWords, text, spellCheckData);

//       // if (hasErrWord.includes(lastWord) || errorPara) {
//       //   console.log('object');
//       // }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   const handleSuggestChange = (word) => {
//     const updatedData = value.map((element) => {
//       const nestedChild = element?.props?.children[0];

//       if (selWord.includes(nestedChild)) {
//         return `${word}\u00A0`;
//       }
//       return element;
//       // if(selWord.includes(nestedChild)){
//       //   const updatedWord = nestedChild.replace(selWord, word);
//       //   return {...element, props:{ ...element.props,children : updatedWord} }
//       // }
//       // return element
//     });
//     console.log(updatedData);
//     setValue(updatedData);
//     setPopoverAnchor(null);
//   };

//   const updatedChekedWords = (errWords, text, spellCheckData) => {
//     // const wordsArray = text.split(' ');
//     console.log(text);
//     const textSplit = text.match(/\b\w+\b/g);
//     console.log('textSplit: ', textSplit);
//     // console.log(textSplit.join(' '));
//     // console.log(errWords);

//     // const anyValuesMatch = textSplit.filter((value) =>
//     //   errWords.includes(value)
//     // );

//     // console.log(anyValuesMatch);

//     // const lastWord = wordsArray[wordsArray.length - 1];
//     // const updatedpara = wordsArray.slice(0, -1).join(' ');
//     // const wordsWithoutLast = wordsArray.slice(0, -1);

//     // const hasErrWord = errWords.map((item) => item);
//     // console.log('hasErr', hasErrWord);

//     // console.log(lastWord);

//     // console.log(errWords);
//     // console.log(errWords.includes(lastWord));
//     // console.log(errWords.some((element) => updatedpara.includes(element)));
//     // const lastPara = errWords.some((element) => updatedpara.includes(element));

//     // console.log(wordsArray);
//     // console.log('text', text.split(' '));
//     // console.log(updatedpara.includes(hasErrWord));

//     // const highlightedWords = wordsArray.map((word, index) => {
//     //   if (errWords.includes(word) ) {

//     //     return (
//     //       <span
//     //         key={index}
//     //         style={{
//     //           textDecoration: "underline red solid 2px",
//     //           cursor: "pointer"
//     //         }}
//     //       >
//     //         {word}&nbsp;
//     //       </span>
//     //     );
//     //   } else {
//     //     return `${word}\u00A0`;
//     //   }
//     // });

//     // const highlightedWords = wordsArray.map((word, index) => {
//     //   if (index === wordsArray.length - 1) {
//     //     console.log('check the word===>',index === wordsArray.length - 1)
//     //     if (errWords.includes(lastWord.trim()) ) {
//     //       return (
//     //         <React.Fragment key={index}>
//     //           <ins
//     //             style={{
//     //               textDecoration: 'underline red solid 2px',
//     //               cursor: 'pointer',
//     //             }}
//     //             onClick={(event) =>
//     //               handlePopoverOpen(event, word, errWords, spellCheckData)
//     //             }>
//     //             {word}&nbsp;
//     //           </ins>
//     //         </React.Fragment>
//     //       );
//     //     } else {
//     //       return `${word}\u00A0`;
//     //     }
//     //   } else {
//     //     return `${word}\u00A0`;
//     //   }
//     // });

//     //&<-----check--->

//     //  const highlightedWords = wordsArray.map((word, index) => {
//     //     // const previousWord = index > 0 ? wordsArray[index - 1] : null;

//     //     if (index === wordsArray.length - 1) {
//     //       if (errWords.includes(lastWord.trim())) {
//     //         return (
//     //           <React.Fragment key={index}>
//     //             <ins
//     //               style={{
//     //                 textDecoration: 'underline red solid 2px',
//     //                 cursor: 'pointer',
//     //               }}
//     //               onClick={(event) =>
//     //                 handlePopoverOpen(event, word, errWords, spellCheckData)
//     //               }
//     //             >
//     //               {word}&nbsp;
//     //             </ins>
//     //           </React.Fragment>
//     //         );
//     //       } else {
//     //         return `${word}\u00A0`;
//     //       }
//     //     } else if (anyValuesMatch) {
//     //       return (
//     //         <React.Fragment key={index}>
//     //           <ins
//     //             style={{
//     //               textDecoration: 'underline red solid 2px',
//     //               cursor: 'pointer',
//     //             }}
//     //             onClick={(event) =>
//     //               handlePopoverOpen(event, word, errWords, spellCheckData)
//     //             }
//     //           >
//     //             {word}&nbsp;
//     //           </ins>
//     //         </React.Fragment>
//     //       );
//     //     } else {
//     //       return `${word}\u00A0`;
//     //     }
//     //   });

//     //&<-----check--->
//     const highlightedWords = textSplit.map((word, index) => {
//       if (errWords.includes(word)) {
//         return (
//           <span
//             key={index}
//             style={{
//               textDecoration: 'underline red solid 2px',
//               cursor: 'pointer',
//             }}
//             onClick={(event) =>
//               handlePopoverOpen(event, word, errWords, spellCheckData)
//             }>
//               {word}&nbsp;
//               {/* {word} */}
//           </span>
//         );
//       }
//       //  else if (anyValuesMatch.includes(word)) {
//       //   return (
//       //     <span
//       //     key={index}
//       //     style={{
//       //       textDecoration: "underline red solid 2px",
//       //       cursor: "pointer"
//       //     }}
//       //     onClick={(event) =>
//       //                     handlePopoverOpen(event, word, errWords, spellCheckData)
//       //                   }
//       //   >
//       //     {word}&nbsp;
//       //   </span>
//       //   );
//       // }
//       else {
//         return `${word}\u00A0`;
//       }
//     });
// const firstHighlightedWord = highlightedWords[0];
// console.log('firstHighlightedWord: ', firstHighlightedWord);

// console.log(highlightedWords)
//     // const valueArr = [value];

// //     console.log(value);
//     const splitWord = value.split(' ');
// //     console.log('splitWord: ', splitWord);
//     const lastword = splitWord[splitWord.length - 1];
// //     console.log('lastword: ', lastword);
// //     const secWord = splitWord[1];
// //     // const updatedValue = value.replace(lastword, firstHighlightedWord);
//     const updatedValue = value.replace(lastword,firstHighlightedWord);

// console.log('updatedValue:', updatedValue);
//     // const appendedText = valueArr.concat(highlightedWords);
//     // console.log('appendedText: ', appendedText);
//     // setValue(appendedText.join(""));

//     // setValue(highlightedWords.concat(value));
//     // setValue(value.push(firstHighlightedWord));
//     // setValue(value.concat(highlightedWords));
//     // setValue(value.concat( errorHighLightWord));
//     console.log(value);
//     setValue(highlightedWords);
//   };

//   // const updatedChekedWords = (errWords, text, spellCheckData) => {
//   //   const enteredWords = text.split(' ');
//   //   console.log(errWords);

//   //   const highlightedWords = enteredWords.map((word) => {
//   //     console.log(word);
//   //     if (errWords.includes(word)) {
//   //       return (
//   //         <>
//   //           <ins
//   //             style={{
//   //               textDecoration: 'underline red solid 2px',
//   //               cursor: 'pointer',
//   //             }}
//   //             onClick={(event) =>
//   //               handlePopoverOpen(event, word, errWords, spellCheckData)
//   //             }>
//   //             {word}{' '}
//   //           </ins>
//   //         </>
//   //       );
//   //     } else {
//   //       return `${word} `
//   //     }
//   //   });
//   //   console.log(highlightedWords);
//   //   setValue(highlightedWords);
//   // };

//   // const updatedChekedWords = (errWords, text, spellCheckData) => {
//   //   const enteredWords = text.split(' ');
//   //   console.log(errWords);

//   //   const trimmedArray = enteredWords.map((element) => element.trim());
//   //   const arrayAsString = trimmedArray.join(', ');
//   //   console.log('LAST----', arrayAsString);

//   //   const words = arrayAsString.split(',').map((word) => word.trim());

//   //   let highlightedWords = '';
//   //   if (words.length > 0) {
//   //     words.pop();

//   //     const updatedText = words.join(' ');
//   //     console.log(updatedText);
//   //     const lastWord = updatedText.substring(updatedText.lastIndexOf(' ') + 1);
//   //     console.log('USCCESS===========', lastWord);
//   //     console.log(errWords);

//   //     if (errWords.includes(lastWord)) {
//   //       highlightedWords = (
//   //         <ins
//   //           style={{
//   //             textDecoration: 'underline red solid 2px',
//   //             cursor: 'pointer',
//   //           }}
//   //           onClick={(event) =>
//   //             handlePopoverOpen(event, lastWord, errWords, spellCheckData)
//   //           }>
//   //           {lastWord}{' '}
//   //         </ins>
//   //       );
//   //     } else {
//   //       highlightedWords = `${lastWord} `;
//   //     }
//   //   } else {
//   //     console.log('No words found');
//   //   }
//   //   console.log(highlightedWords);
//   //     setValue(highlightedWords);

//   //   // const lastWord = text.substring(text.lastIndexOf(' ') + 1);
//   //   // console.log( lastWord);

//   //   // if(errWords.includes(lastWord)){
//   //   //   console.log('object');
//   //   // }

//   //   //   const highlightedWords = enteredWords.map((word) => {
//   //   //   console.log(errWords.includes(word));

//   //   //   if (errWords.includes(word)) {
//   //   //     return (
//   //   //       <>
//   //   //         <ins
//   //   //           style={{
//   //   //             textDecoration: 'underline red solid 2px',
//   //   //             cursor: 'pointer',
//   //   //           }}
//   //   //           onClick={(event) =>
//   //   //             handlePopoverOpen(event, word, errWords, spellCheckData)
//   //   //           }>
//   //   //           {word}{' '}
//   //   //         </ins>
//   //   //       </>
//   //   //     );
//   //   //   } else {
//   //   //     return `${word} `;
//   //   //   }
//   //   // });
//   //   // console.log(highlightedWords);
//   //   // setValue(highlightedWords);
//   // };
//   return (
//     <>
//       <InputBoxContainer>
//         <Typography variant="h4">Spell Check</Typography>
//         <SuggestionPopUp
//           // onChange={onChange}
//           onMouseMove={handleMouseMove}
//           onMouseEnter={handleMouseEnter}
//           onMouseLeave={handleMouseLeave}
//           ref={contentEditableRef}
//           onKeyDownCapture={handleKeyPress}
//           spellCheck={false}
//           // onInput={onChange}
//           suppressContentEditableWarning={true}
//           contentEditable>
//           {value}
//         </SuggestionPopUp>

//         <Popover
//           open={openPopover}
//           anchorReference="anchorPosition"
//           anchorPosition={{ top: coords.y, left: coords.x }}
//           onClose={handlePopoverClose}>
//           {result?.map((element) => (
//             <List key={element?.word}>
//               {element?.word?.map((word, index) => (
//                 <ListItem
//                   key={index}
//                   sx={{ cursor: 'pointer' }}
//                   onClick={() => handleSuggestChange(word)}>
//                   {word}
//                 </ListItem>
//               ))}
//             </List>
//           ))}
//         </Popover>
//       </InputBoxContainer>
//     </>
//   );
// };
//NOTE - //!next 2
// import React, { useEffect, useRef } from 'react';
// import './style.css';

// export function Grammer() {
//   const contentEditableRef = useRef();
//   let enteredText = '';
//   let typingTimer;

//   // useEffect(() => {
//   //   if (contentEditableRef.current) {
//   //     contentEditableRef.current.focus();
//   //     const selection = window.getSelection();
//   //     selection.selectAllChildren(contentEditableRef.current);
//   //     selection.collapseToEnd();
//   //   }
//   // });

//   const handleInputChange = () => {
//     clearTimeout(typingTimer);
//     typingTimer = setTimeout(() => {
//       enteredText = document.getElementById('textarea')?.innerText;
//       console.log(enteredText);
//       performCheck(enteredText);
//     }, 2000);
//   };
//   // const handleInputChange = () => {
//   //   enteredText = document.getElementById("textarea")?.innerText;
//   //   console.log(enteredText);
//   //   performCheck(enteredText);
//   // };

//   // const performCheck = (text) => {
//   //   const splitText = text.match(/\b\w+\b/g);
//   //   const errWord = "hwllo";
//   //   const textSpan = splitText.map((item, index) => {
//   //     console.log("splitText", splitText);
//   //     if (errWord.includes(item)) {
//   //       return (
//   //         <span
//   //           key={index}
//   //           style={{
//   //             textDecoration: "underline red solid 2px",
//   //             cursor: "pointer"
//   //           }}
//   //         >
//   //           {item}&nbsp;
//   //         </span>
//   //       );
//   //     } else {
//   //       return `${item}`;
//   //     }
//   //   });
//   //   console.log("textSpan", textSpan);
//   //   document.getElementById("textarea").innerText = "";
//   // };

//   //NOTE - check

//   const performCheck = (text) => {
//     const splitText = text.match(/\b\w+\b/g);
//     const errWord = 'hwllo';
//     const textSpan = splitText.map((item, index) => {
//       console.log('item: ', item);
//       console.log('splitText', splitText, errWord.includes(item));
//       if (errWord.includes(item)) {
//         return `<span key=${index} style={{ textDecoration: "underline red solid 2px", cursor: "pointer" }}>
//           ${item}&nbsp;
//           </span>`;
//       } else {
//         return `${item}`;
//       }
//     });

//     console.log('textSpan', textSpan);

//     // const lastWord = textSpan[textSpan.length - 1];
//     // console.log('lastWord', lastWord);

//     document.getElementById('textarea').innerHTML = textSpan;
//     console.log('textSpan: ', textSpan);

//     // const checkError = textSpan.map((err, index) => {
//     //   if (err.includes('<span')) {
//     //     console.log(document.querySelectorAll('span'));
//     //     document.querySelectorAll('span')[0].style.textDecoration = 'underline red solid 2px';
//     //     document.querySelectorAll('span')[0].style.cursor = 'pointer';
//     //     return err;
//     //   }
//     //   return err;
//     // });
//     // console.log(checkError);
//     const checkError = textSpan.map((err, index) => {
//       if (err.includes('<span')) {
//         const spanElements = document.querySelectorAll('span');
//         spanElements.forEach((spanElement) => {
//           spanElement.style.textDecoration = 'underline red solid 2px';
//           spanElement.style.cursor = 'pointer';

//         });
//         // return err;

//       }
//       return err;
//     });
//     console.log('checkError: ', checkError);

//     // document.querySelectorAll('span')[0].style.textDecoration = 'underline red solid 2px';
//     // document.querySelectorAll('span')[0].style.cursor = 'pointer';

//     // document.querySelectorAll('span')[0].style.textDecoration ='underline red solid 2px';
//     // document.querySelectorAll('span')[0].style.cursor = 'pointer';

//     //     const spanElements = document.querySelectorAll('span');
//     // spanElements.forEach((spanElement) => {
//     //   if (errWord.includes(spanElement.innerText)) {
//     //     spanElement.style.textDecoration = 'underline red solid 2px';
//     //     spanElement.style.cursor = 'pointer';
//     //   }
//     // });

//     // document.querySelectorAll('span').style.textDecoration ='underline red solid 2px';
//     // document.querySelectorAll('span').style.cursor = 'pointer';
//     // if (document.querySelectorAll('span').length) {
//     //   console.log(document.querySelectorAll('span'))
//     //   document.querySelectorAll('span')[0].style.textDecoration ='underline red solid 2px';
//     //   document.querySelectorAll('span')[0].style.cursor = 'pointer';
//     // }

//     /* let textareaElement = document.getElementById("textarea").innerHTML;
//     console.log("textareaElement", textareaElement);
//     textareaElement = textSpan; */

//     // if(){
//     //   console.log('sss');
//     // }else{
//     //   console.log('www');
//     //   document.querySelectorAll("span")[0].style.textDecoration = "underline red solid 2px";
//     //   document.querySelectorAll("span")[0].style.cursor="pointer";
//     // }

//     /* textSpan.forEach((item) => {
//       if (typeof item === "string") {
//         // enteredText.appendChild(document.createTextNode(item));
//         textareaElement.innerText = textSpan.join(" ");
//       } else if (typeof item === "object") {
//         // enteredText.appendChild(item);
//         enteredText.value = textSpan.join(" ");
//       }
//     }); */
//     // if (textareaElement.innerText?.length === 0) {
//     //   textareaElement.innerHTML = "";
//     //   textSpan.forEach((span) => {
//     //     textareaElement.appendChild(span);
//     //   });
//     // }
//     // if (textSpan.length === 0) {
//     //   textareaElement.appendChild(document.createTextNode(enteredText));
//     // } else {
//     //   textSpan.forEach((span) => {
//     //     textareaElement.appendChild(span);
//     //   });
//     // }
//   };

//   // const performCheck = (text) => {
//   //   const splitText = text.match(/\b\w+\b/g);
//   //   const errWord = "hwllo";
//   //   const gg=[];
//   //   const textSpan = splitText.map((item, index) => {
//   //     console.log("splitText", splitText);
//   //     if (errWord.includes(item)) {
//   //       gg.push(`<span
//   //       key=${index}
//   //     >
//   //       ${item}&nbsp;
//   //     </span>`)
//   //       return (
//   //         `<span
//   //           key=${index}
//   //           className=${"test"}
//   //         >
//   //           ${item}&nbsp;
//   //         </span>`
//   //       );
//   //     } else {
//   //       return `${item}`;
//   //     }
//   //   });

//   //   console.log("textSpan", textSpan);
//   //   console.log("gg",gg)

//   //   /* let textareaElement = document.getElementById("textarea").innerHTML;
//   //   console.log("textareaElement", textareaElement);
//   //   textareaElement = textSpan; */
//   //   document.getElementById("textarea").innerHTML = gg[0];
//   //   document.querySelectorAll("span")[0].style.textDecoration="underline red solid 2px";
//   //   document.querySelectorAll("span")[0].style.cursor="pointer";

//   // };

//   return (
//     <div
//       id="textarea"
//       contentEditable
//       spellCheck={false}
//       suppressHydrationWarning
//       onInput={handleInputChange}
//       ref={contentEditableRef}></div>
//   );
// }

import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Popover, List, ListItem, Typography } from '@mui/material';
import { InputBoxContainer, SuggestionPopUp } from '../../styles/pages/Index';

export const Grammer = () => {
  const [value, setValue] = useState('');
  const contentEditableRef = useRef(null);
  const [popoverAnchor, setPopoverAnchor] = useState(null); //popover
  const [result, setResult] = useState(null); // filter result
  const [selWord, setSelWord] = useState('');
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [showPopup, setShowPopup] = useState(false);
  const [errWord, setErrWord] = useState('');
  const [appendedText, setAppendedText] = useState('');
  // useEffect(() => {
  //   moveCursorToEnd();
  // }, [value]);

  useEffect(() => {
    if (contentEditableRef.current) {
      contentEditableRef.current.focus();
      const selection = window.getSelection();
      selection.selectAllChildren(contentEditableRef.current);
      selection.collapseToEnd();
    }
  });

  const openPopover = Boolean(popoverAnchor);
  const handlePopoverClose = () => setPopoverAnchor(null);
  const handleMouseMove = (event) => {
    setCoords({ x: event.clientX, y: event.clientY });
  };

  const handleMouseEnter = () => setShowPopup(true);
  const handleMouseLeave = () => setShowPopup(false);

  const moveCursorToEnd = () => {
    const element = contentEditableRef.current;
    const range = document.createRange();
    const selection = window.getSelection();

    range.selectNodeContents(element);
    range.collapse(false);

    selection.removeAllRanges();
    selection.addRange(range);

    element.focus();
  };

  const handlePopoverOpen = (event, word, errWords, spellCheckData) => {
    setPopoverAnchor(event.currentTarget);
    console.log(errWords);
    setResult(spellCheckData.filter((item) => item.correct === word));
    setSelWord(word);
  };

  // let timeoutId;
  const onChange = (e) => {
    let updatedText = e.target.innerText;
    // const updatedText = e.target.textContent.split('').reverse().join('');
    console.log(updatedText);
    // const lastWord = updatedText.substring(updatedText.lastIndexOf(" ")+1);
    // console.log(lastWord);
    setValue(updatedText);
    performSpellCheck(updatedText);
  };

  const handleKeyPress = (e) => {
    const key = e.key;
    const code = e.code.slice(-1);

    let updatedText = e.target.textContent;
// let updatedText = document.getElementById('textArea').value;
    console.log('updatedText: ', key);

    const wordsAll = updatedText.split(' ');
    console.log('wordsAll:', wordsAll);

    const lastWord = wordsAll[wordsAll.length - 1];
    console.log('lastWord:', lastWord);

    const appendText = typeof value === 'object' ? lastWord : updatedText;
    console.log('appendedText:', appendText);
    // let updatedText = '';
    // if (value) {
    //   updatedText = value + key;
    // } else {
    //   updatedText = e.target.textContent;
    // }
    const text = '';
    const appendedText = typeof value === 'object' ? text : updatedText;
    console.log('text: ', text);
    console.log('string: ', updatedText);
    // console.log('object: ',  Object?.values(value));

    // console.log('appendedText', appendText)
    // console.log(typeof value);
    // console.log(appendedText);
    const valuesWithoutLast = value.slice(0, -1);
    console.log(valuesWithoutLast);
    if (key === ' ') {
      performSpellCheck(updatedText);
    }

    if (typeof value === 'object') {
      const values = Object.values(value);
      const valuesWithoutLast = values.slice(0, -1);
      console.log(valuesWithoutLast);
    }

    // if (typeof value === 'object') {
    //   setValue(value);
    // } else {
    //   setValue(appendText);
    // }
    //setValue(updatedText);

    //     const appendedText = value.concat(key)
    setValue(updatedText);
  };

  // const onChange = (e) => {
  //   if (contentEditableRef.current) {
  //     contentEditableRef.current.focus();
  //     const selection = window.getSelection();
  //     selection.selectAllChildren(contentEditableRef.current);
  //     selection.collapseToEnd();
  //   }

  //   let updatedText = e.target.textContent;
  //   console.log(updatedText);
  //   // performSpellCheck(updatedText);
  //   setValue(updatedText);

  // };

  const performSpellCheck = async (text) => {
    try {
      const response = await axios.post(
        'https://api.textgears.com/spelling',
        {
          text: text,
          language: 'en-US',
        },
        {
          params: {
            key: '592h55ggasQtr3jn',
          },
        }
      );
      const spellCheckResult = response.data;
      const spellCheckData = spellCheckResult?.response.errors.map((match) => {
        return {
          message: match.description,
          offset: match.offset,
          length: match.length,
          word: match.better,
          type: match.type,
          correct: match.bad,
        };
      });
      console.log(spellCheckData);

      const errWords = spellCheckData.map((error) => error.correct);
      setErrWord(errWords);

      // const hasErrWord = errWords.map((item) => item);
      // console.log('hasErr', hasErrWord);

      // const lastWord = text.substring(text.lastIndexOf(' ') + 1);
      // // console.log('lastword', lastWord);

      // const errorPara = errWords.some((errorWord) => text.includes(errorWord));
      // console.log(errorPara);

      // console.log(hasErrWord.includes(lastWord));
      updatedChekedWords(errWords, text, spellCheckData);

      // if (hasErrWord.includes(lastWord) || errorPara) {
      //   console.log('object');
      // }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSuggestChange = (word) => {
    const updatedData = value.map((element) => {
      const nestedChild = element?.props?.children[0];

      if (selWord.includes(nestedChild)) {
        return `${word}\u00A0`;
      }
      return element;
      // if(selWord.includes(nestedChild)){
      //   const updatedWord = nestedChild.replace(selWord, word);
      //   return {...element, props:{ ...element.props,children : updatedWord} }
      // }
      // return element
    });
    console.log(updatedData);
    setValue(updatedData);
    setPopoverAnchor(null);
  };

  const updatedChekedWords = (errWords, text, spellCheckData) => {
    const wordsArray = text.split(' ');
    const textSplit = text.match(/\b\w+\b/g);
    console.log(textSplit.join(' '));
    console.log(errWords);

    const anyValuesMatch = textSplit.filter((value) =>
      errWords.includes(value)
    );

    console.log(anyValuesMatch);

    const lastWord = wordsArray[wordsArray.length - 1];
    const updatedpara = wordsArray.slice(0, -1).join(' ');
    const wordsWithoutLast = wordsArray.slice(0, -1);

    const hasErrWord = errWords.map((item) => item);
    console.log('hasErr', hasErrWord);
    console.log(lastWord);

    console.log(errWords);
    console.log(errWords.includes(lastWord));
    console.log(errWords.some((element) => updatedpara.includes(element)));
    const lastPara = errWords.some((element) => updatedpara.includes(element));

    console.log(wordsArray);
    console.log('text', text.split(' '));
    console.log(updatedpara.includes(hasErrWord));

    // const highlightedWords = wordsArray.map((word, index) => {
    //   if (errWords.includes(word) ) {

    //     return (
    //       <span
    //         key={index}
    //         style={{
    //           textDecoration: "underline red solid 2px",
    //           cursor: "pointer"
    //         }}
    //       >
    //         {word}&nbsp;
    //       </span>
    //     );
    //   } else {
    //     return `${word}\u00A0`;
    //   }
    // });

    // const highlightedWords = wordsArray.map((word, index) => {
    //   if (index === wordsArray.length - 1) {
    //     console.log('check the word===>',index === wordsArray.length - 1)
    //     if (errWords.includes(lastWord.trim()) ) {
    //       return (
    //         <React.Fragment key={index}>
    //           <ins
    //             style={{
    //               textDecoration: 'underline red solid 2px',
    //               cursor: 'pointer',
    //             }}
    //             onClick={(event) =>
    //               handlePopoverOpen(event, word, errWords, spellCheckData)
    //             }>
    //             {word}&nbsp;
    //           </ins>
    //         </React.Fragment>
    //       );
    //     } else {
    //       return `${word}\u00A0`;
    //     }
    //   } else {
    //     return `${word}\u00A0`;
    //   }
    // });

    //&<-----check--->

    //  const highlightedWords = wordsArray.map((word, index) => {
    //     // const previousWord = index > 0 ? wordsArray[index - 1] : null;

    //     if (index === wordsArray.length - 1) {
    //       if (errWords.includes(lastWord.trim())) {
    //         return (
    //           <React.Fragment key={index}>
    //             <ins
    //               style={{
    //                 textDecoration: 'underline red solid 2px',
    //                 cursor: 'pointer',
    //               }}
    //               onClick={(event) =>
    //                 handlePopoverOpen(event, word, errWords, spellCheckData)
    //               }
    //             >
    //               {word}&nbsp;
    //             </ins>
    //           </React.Fragment>
    //         );
    //       } else {
    //         return `${word}\u00A0`;
    //       }
    //     } else if (anyValuesMatch) {
    //       return (
    //         <key={index}>
    //           <ins
    //             style={{
    //               textDecoration: 'underline red solid 2px',
    //               cursor: 'pointer',
    //             }}
    //             onClick={(event) =>
    //               handlePopoverOpen(event, word, errWords, spellCheckData)
    //             }
    //           >
    //             {word}&nbsp;
    //           </ins>
    //         </key=>
    //       );
    //     } else {
    //       return `${word}\u00A0`;
    //     }
    //   });

    //&<-----check--->
    const highlightedWords = textSplit.map((word, index) => {
      if (errWords.includes(word)) {
        return (
          <span
            key={index}
            style={{
              textDecoration: 'underline red solid 2px',
              cursor: 'pointer',
            }}
            onClick={(event) =>
              handlePopoverOpen(event, word, errWords, spellCheckData)
            }>
            {word}&nbsp;
          </span>
        );
      }
      //  else if (anyValuesMatch.includes(word)) {
      //   return (
      //     <span
      //     key={index}
      //     style={{
      //       textDecoration: "underline red solid 2px",
      //       cursor: "pointer"
      //     }}
      //     onClick={(event) =>
      //                     handlePopoverOpen(event, word, errWords, spellCheckData)
      //                   }
      //   >
      //     {word}&nbsp;
      //   </span>
      //   );
      // }
      else {
        return `${word}\u00A0`;
      }
    });
    console.log(highlightedWords);
    setAppendedText(highlightedWords);
    console.log(appendedText);
    // const valueArr = [value];

    console.log(value);
    // const appendedText = valueArr.concat(highlightedWords);
    // console.log('appendedText: ', appendedText);
    // setValue(appendedText.join(""));

    // let appendText = [...value, ...highlightedWords];
    console.log('appendedText: ', appendedText);
    setValue(highlightedWords);

    // setValue(appendedText);
  };

  // const updatedChekedWords = (errWords, text, spellCheckData) => {
  //   const enteredWords = text.split(' ');
  //   console.log(errWords);

  //   const highlightedWords = enteredWords.map((word) => {
  //     console.log(word);
  //     if (errWords.includes(word)) {
  //       return (
  //         <>
  //           <ins
  //             style={{
  //               textDecoration: 'underline red solid 2px',
  //               cursor: 'pointer',
  //             }}
  //             onClick={(event) =>
  //               handlePopoverOpen(event, word, errWords, spellCheckData)
  //             }>
  //             {word}{' '}
  //           </ins>
  //         </>
  //       );
  //     } else {
  //       return `${word} `
  //     }
  //   });
  //   console.log(highlightedWords);
  //   setValue(highlightedWords);
  // };

  // const updatedChekedWords = (errWords, text, spellCheckData) => {
  //   const enteredWords = text.split(' ');
  //   console.log(errWords);

  //   const trimmedArray = enteredWords.map((element) => element.trim());
  //   const arrayAsString = trimmedArray.join(', ');
  //   console.log('LAST----', arrayAsString);

  //   const words = arrayAsString.split(',').map((word) => word.trim());

  //   let highlightedWords = '';
  //   if (words.length > 0) {
  //     words.pop();

  //     const updatedText = words.join(' ');
  //     console.log(updatedText);
  //     const lastWord = updatedText.substring(updatedText.lastIndexOf(' ') + 1);
  //     console.log('USCCESS===========', lastWord);
  //     console.log(errWords);

  //     if (errWords.includes(lastWord)) {
  //       highlightedWords = (
  //         <ins
  //           style={{
  //             textDecoration: 'underline red solid 2px',
  //             cursor: 'pointer',
  //           }}
  //           onClick={(event) =>
  //             handlePopoverOpen(event, lastWord, errWords, spellCheckData)
  //           }>
  //           {lastWord}{' '}
  //         </ins>
  //       );
  //     } else {
  //       highlightedWords = `${lastWord} `;
  //     }
  //   } else {
  //     console.log('No words found');
  //   }
  //   console.log(highlightedWords);
  //     setValue(highlightedWords);

  //   // const lastWord = text.substring(text.lastIndexOf(' ') + 1);
  //   // console.log( lastWord);

  //   // if(errWords.includes(lastWord)){
  //   //   console.log('object');
  //   // }

  //   //   const highlightedWords = enteredWords.map((word) => {
  //   //   console.log(errWords.includes(word));

  //   //   if (errWords.includes(word)) {
  //   //     return (
  //   //       <>
  //   //         <ins
  //   //           style={{
  //   //             textDecoration: 'underline red solid 2px',
  //   //             cursor: 'pointer',
  //   //           }}
  //   //           onClick={(event) =>
  //   //             handlePopoverOpen(event, word, errWords, spellCheckData)
  //   //           }>
  //   //           {word}{' '}
  //   //         </ins>
  //   //       </>
  //   //     );
  //   //   } else {
  //   //     return `${word} `;
  //   //   }
  //   // });
  //   // console.log(highlightedWords);
  //   // setValue(highlightedWords);
  // };
  return (
    <>
      <InputBoxContainer>
        <Typography variant="h4">Spell Check</Typography>
        <SuggestionPopUp
          id="textArea"
          // onChange={onChange}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          ref={contentEditableRef}
          onKeyUp={handleKeyPress}
          spellCheck={false}
          // onInput={onChange}
          suppressContentEditableWarning
          contentEditable>
          {value}
        </SuggestionPopUp>

        <Popover
          open={openPopover}
          anchorReference="anchorPosition"
          anchorPosition={{ top: coords.y, left: coords.x }}
          onClose={handlePopoverClose}>
          {result?.map((element) => (
            <List key={element?.word}>
              {element?.word?.map((word, index) => (
                <ListItem
                  key={index}
                  sx={{ cursor: 'pointer' }}
                  onClick={() => handleSuggestChange(word)}>
                  {word}
                </ListItem>
              ))}
            </List>
          ))}
        </Popover>
      </InputBoxContainer>
    </>
  );
};