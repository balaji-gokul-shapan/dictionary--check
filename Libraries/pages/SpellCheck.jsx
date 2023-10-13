import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Popover, List, ListItem, Typography } from '@mui/material';
import { InputBoxContainer, SuggestionPopUp } from '../../styles/pages/Index';

export const SpellCheck = () => {
  const [value, setValue] = useState(null);
  const contentEditableRef = useRef(null);
  const [popoverAnchor, setPopoverAnchor] = useState(null); //popover
  const [result, setResult] = useState(null); // filter result
  const [selWord, setSelWord] = useState('');
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [showPopup, setShowPopup] = useState(false);
  const [errWord, setErrWord] = useState('');
  const [highlightedPara, setHighlightedPara] = useState('');

  useEffect(() => {
    if (contentEditableRef.current) {
      contentEditableRef.current.focus();
      const selection = window.getSelection();
      selection.selectAllChildren(contentEditableRef.current);
      selection.collapseToEnd();
    }
  }, );

  const openPopover = Boolean(popoverAnchor);
  const handlePopoverClose = () => setPopoverAnchor(null);
  const handleMouseEnter = () => setShowPopup(true);
  const handleMouseLeave = () => setShowPopup(false);
  const handleMouseMove = (event) => {
    setCoords({ x: event.clientX, y: event.clientY });
  };

  const handlePopoverOpen = (event, word, errWords, spellCheckData) => {
    // console.log('spellCheckData: ', spellCheckData);
    setPopoverAnchor(event.currentTarget);
    // console.log(errWords);
    setResult(spellCheckData.filter((item) => item.correct === word));
    setSelWord(word);
  };


  // const handleKeyPress = (e) => {
  //   const key = e.key;
  //   const code = e.code.slice(-1);
  //   // let updatedText = e.target.innerText;

  //   let updatedText;

  //   // if (typeof value === 'string') {
  //   //   updatedText = e.target.innerText;
  //   // } else if (typeof value === 'object') {
  //   //   updatedText = e.target.innerText;
  //   // }

  //   if (typeof value === 'string') {
  //     updatedText = e.target.innerText;
  //   } else if (typeof value === 'object') {
  //     updatedText = {
  //       $$typeof: Symbol.for('react.element'),
  //       type: value.type || 'span',
  //       key: value.key,
  //       ref: value.ref || null,
  //       props: { children: [e.target.innerText] },
  //       _owner: value._owner,
  //       _store: value._store,
  //       _self: value._self,
  //       _source: value._source
  //     };
  //     updatedText = [updatedText];
  //   }
  //   console.log('updatedText: ', updatedText);
  //   console.log('highlightedPara: ', highlightedPara);
  //   console.log(value);

  //   if (key === ' ') {
  //     performSpellCheck(updatedText);
  //   } else {
  //     setValue(updatedText);
  //   }

  //   // if (key === ' ') {
  //   //   performSpellCheck(updatedText);
  //   // } else {
  //   //   if (typeof value === 'object') {
  //   //     setValue(highlightedPara);
  //   //   } else {
  //   //     setValue(updatedText);
  //   //   }
  //   // }
  // };

  // const handleKeyPress = (e) => {
  //   const key = e.key;
  //   let updatedText = e.target.innerText;
  //   console.log(typeof value);
  //   console.log(value);
  //   console.log(highlightedPara);

  //   if (key === ' ') {
  //     performSpellCheck(updatedText);
  //   }

  //   // const lastWord = updatedText.trim().match(/\b\w+\b/g).pop();
  //   // console.log('lastWord: ', lastWord);

  //   // if (key ===' ') {
  //   //   performSpellCheck(updatedText);
  //   // } else {
  //   //   setValue(updatedText);
  //   //   // updatedText =' ';
  //   //   console.log('updatedText: ', updatedText);
  //   // }
  //   // const innerTextObject = JSON.parse(updatedText);
  //   // console.log('innerTextObject: ', innerTextObject);
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
            key: '09y1nMLOkff4WpWz',
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
      // console.log(spellCheckData);

      const errWords = spellCheckData.map((error) => error.correct);
      setErrWord(errWords);

      updatedChekedWords(errWords, text, spellCheckData);
    } catch (error) {
      // console.error('Error:', error);
    }
  };

  const handleSuggestChange = (word) => {
    const updatedData = value.map((element) => {
      const nestedChild = element?.props?.children[0];
      if (selWord.includes(nestedChild)) {
        return `${word}\u00A0`;
      }
      return element;
    });
    // console.log(updatedData);
    setValue(updatedData);
    setPopoverAnchor(null);
  };

  const updatedChekedWords = (errWords, text, spellCheckData) => {
    const textSplit = text.match(/\b\w+\b/g);
    // const lastWord = textSplit.pop();

    // if (typeof value === 'object') {
    //   console.log('object');
    //   const lastWord = textSplit[textSplit.length - 1];
    //   console.log('lastWord: ', lastWord);
    // } else {
    //   console.log('not object');
    // }

    // const highlightedWords = textSplit.map((word, index) => {
    //   if(value.length > 0){

    //   }
    //   if (errWords.includes(word)) {
    //     return (
    //       <span
    //         key={index}
    //         style={{
    //           textDecoration: 'underline red solid 2px',
    //           cursor: 'pointer',
    //         }}
    //         onClick={(event) =>
    //           handlePopoverOpen(event, word, errWords, spellCheckData)
    //         }>
    //         {word}&nbsp;
    //       </span>
    //     );
    //   }
    //   else {
    //     return `${word}\u00A0`;
    //   }
    // });
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
      } else {
        return `${word}\u00A0`;
      }
    });
     document.getElementById('textArea').innerHTML = '';
    // if(isEmpty){highlightedWords.push('')}
    if (document.getElementById('textArea').innerHTML.trim() === '') {
      // console.log('ds');
      highlightedWords.push('');
    }
    highlightedWords.push('testtt');
    highlightedWords.push('');
    setValue(highlightedWords);
    setHighlightedPara(highlightedWords);
    // console.log('highlightedWords: ', highlightedWords);
  };

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
          // onKeyUp={handleKeyPress}
          spellCheck={false}
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
