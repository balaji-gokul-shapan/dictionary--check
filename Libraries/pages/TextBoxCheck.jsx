// import React, { useState, useRef, useEffect } from 'react';
// import axios from 'axios';
// import { Popover, List, ListItem, Typography } from '@mui/material';
// import { InputBoxContainer, SuggestionPopUp } from '../../styles/pages/Index';

// export const TextBoxCheck = () => {
//   const [value, setValue] = useState(null);
//   const contentEditableRef = useRef(null);
//   const [popoverAnchor, setPopoverAnchor] = useState(null); //popover
//   const [result, setResult] = useState(null); // filter result
//   const [selWord, setSelWord] = useState('');
//   const [coords, setCoords] = useState({ x: 0, y: 0 });
//   const [showPopup, setShowPopup] = useState(false);
//   const [errWord, setErrWord] = useState('');
//   const [highlightedPara, setHighlightedPara] = useState('');

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
//   const handleMouseEnter = () => setShowPopup(true);
//   const handleMouseLeave = () => setShowPopup(false);
//   const handleMouseMove = (event) => {
//     setCoords({ x: event.clientX, y: event.clientY });
//   };

//   const handlePopoverOpen = (event, word, errWords, spellCheckData) => {
//     setPopoverAnchor(event.currentTarget);
//     console.log(errWords);
//     setResult(spellCheckData.filter((item) => item.correct === word));
//     setSelWord(word);
//   };

//   // const handleKeyPress = (e) => {
//   //   const key = e.key;
//   //   const code = e.code.slice(-1);
//   //   // let updatedText = e.target.innerText;

//   //   let updatedText;

//   //   // if (typeof value === 'string') {
//   //   //   updatedText = e.target.innerText;
//   //   // } else if (typeof value === 'object') {
//   //   //   updatedText = e.target.innerText;
//   //   // }

//   //   if (typeof value === 'string') {
//   //     updatedText = e.target.innerText;
//   //   } else if (typeof value === 'object') {
//   //     updatedText = {
//   //       $$typeof: Symbol.for('react.element'),
//   //       type: value.type || 'span',
//   //       key: value.key,
//   //       ref: value.ref || null,
//   //       props: { children: [e.target.innerText] },
//   //       _owner: value._owner,
//   //       _store: value._store,
//   //       _self: value._self,
//   //       _source: value._source
//   //     };
//   //     updatedText = [updatedText];
//   //   }
//   //   console.log('updatedText: ', updatedText);
//   //   console.log('highlightedPara: ', highlightedPara);
//   //   console.log(value);

//   //   if (key === ' ') {
//   //     performSpellCheck(updatedText);
//   //   } else {
//   //     setValue(updatedText);
//   //   }

//   //   // if (key === ' ') {
//   //   //   performSpellCheck(updatedText);
//   //   // } else {
//   //   //   if (typeof value === 'object') {
//   //   //     setValue(highlightedPara);
//   //   //   } else {
//   //   //     setValue(updatedText);
//   //   //   }
//   //   // }
//   // };

//   const handleKeyPress = (e) => {
//     const key = e.key;
//     let updatedText = e.target.innerText;
//     console.log('updatedText: ', updatedText);
//     const lastWord = updatedText.split(' ')[updatedText.split(' ').length - 1];
//     console.log('lastWord: ', lastWord);

//     const words = updatedText.match(/\b\w+\b/g);
//     console.log('words: ', words);
//     // const wordsWithoutLast = words.slice(0, -1);
//     const updatedpara = words?.slice(0, -1)?.join(' ');
//     console.log('updatedpara: ', updatedpara);
//     // console.log('allButLastWord: ', wordsWithoutLast);
//     // console.log(value);
//     console.log(highlightedPara);
//     console.log(updatedpara);

//     const highlightedText = highlightedPara[0]?.props?.children?.map(child => child.props ? child.props.children : child).join('') || '';
//     console.log(`highlightedText: `, highlightedText);

//     if (key === ' ') {
//       performSpellCheck(updatedText);
//     } else if (highlightedPara && key !== ' ') {
//       setValue(lastWord)
//       // performSpellCheck(updatedText);
//       console.log('d');
//     }
//     setValue(updatedText);

//     // if (highlightedPara && key === ' ') {
//     //   performSpellCheck(updatedText);
//     //   console.log('a');
//     // }else if (highlightedPara  && key !== ' '){
//     //   console.log('d');
//     //   performSpellCheck("updatedText");
//     // } else if (!highlightedPara && key === ' ') {
//     //   performSpellCheck(updatedText);
//     //   console.log('b');
//     // } else {
//     //   console.log('c');
//     //   setValue(updatedText);
//     // }

//     // const lastWord = updatedText.trim().match(/\b\w+\b/g).pop();
//     // console.log('lastWord: ', lastWord);
//   };
//   const performSpellCheck = async (text) => {
//     console.log('text: ', text);
//     try {
//       const response = await axios.post(
//         'https://api.textgears.com/spelling',
//         {
//           text: text,
//           language: 'en-US',
//         },
//         {
//           params: {
//             key: '592h55ggasQtr3jn',
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

//       updatedChekedWords(errWords, text, spellCheckData);
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
//     });
//     console.log(updatedData);
//     setValue(updatedData);
//     setPopoverAnchor(null);
//   };

//   const updatedChekedWords = (errWords, text, spellCheckData) => {
//     console.log('text: ', text);
//     const textSplit = text.match(/\b\w+\b/g);
//     const lastWord = textSplit[textSplit.length - 1];
//     // const lastWord = textSplit.pop().split(' ');
//     // console.log('lastWord: ', lastWord);

//     // if (typeof value === 'object') {
//     //   console.log('object');
//     //   const lastWord = textSplit[textSplit.length - 1];
//     //   console.log('lastWord: ', lastWord);
//     // } else {
//     //   console.log('not object');
//     // }

//     // const highlightedWords = textSplit.map((word, index) => {
//     //   if(value.length > 0){

//     //   }
//     //   if (errWords.includes(word)) {
//     //     return (
//     //       <span
//     //         key={index}
//     //         style={{
//     //           textDecoration: 'underline red solid 2px',
//     //           cursor: 'pointer',
//     //         }}
//     //         onClick={(event) =>
//     //           handlePopoverOpen(event, word, errWords, spellCheckData)
//     //         }>
//     //         {word}&nbsp;
//     //       </span>
//     //     );
//     //   }
//     //   else {
//     //     return `${word}\u00A0`;
//     //   }
//     // });
//     const highlightedWords = textSplit.map((word, index) => {
//       if (errWords.includes(lastWord)) {
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
//             {word}&nbsp;
//           </span>
//         );
//       } else {
//         return `${word}\u00A0`;
//       }
//     });
//     console.log('highlightedWords: ', highlightedWords);
//     document.getElementById('textArea').innerText = ' ';
//     // highlightedWords.concat(value)

//     setHighlightedPara(highlightedWords);
//     setValue(highlightedPara.concat(highlightedWords));
//     console.log(highlightedPara);
//     console.log('highlightedWords: ', highlightedWords);
//   };

//   return (
//     <>
//       <InputBoxContainer>
//         <Typography variant="h4">Spell Check</Typography>
//         <SuggestionPopUp
//           id="textArea"
//           // onChange={onChange}
//           onMouseMove={handleMouseMove}
//           onMouseEnter={handleMouseEnter}
//           onMouseLeave={handleMouseLeave}
//           ref={contentEditableRef}
//           onKeyUp={handleKeyPress}
//           spellCheck={false}
//           suppressContentEditableWarning
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
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Popover, List, ListItem, Typography } from '@mui/material';
import { InputBoxContainer, SuggestionPopUp } from '../../styles/pages/Index';

export const TextBoxCheck = () => {
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
    console.log('spellCheckData: ', spellCheckData);
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