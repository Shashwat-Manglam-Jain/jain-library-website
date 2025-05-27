  "use client";

import React, { useState, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import Head from 'next/head';
import Image from 'next/image';

const quotesData = {
  "success": true,
  "count": 120,
  "quotes": [
    {
      "id": 1,
      "quote": "अहिंसा परमो धर्मः।",
      "meaning": "Non-violence is the supreme religion",
      "author": "भगवान महावीर"
    },
    {
      "id": 2,
      "quote": "जीवो का उद्धार करना ही सच्चा धर्म है।",
      "meaning": "True religion lies in uplifting all living beings",
      "author": "आचार्य कुन्दकुन्द"
    },
    {
      "id": 3,
      "quote": "सत्य के मार्ग पर चलो, अहिंसा के सिद्धांत का पालन करो।",
      "meaning": "Walk the path of truth while practicing non-violence",
      "author": "भगवान पार्श्वनाथ"
    },
    {
      "id": 4,
      "quote": "मन, वचन और कर्म से किसी को भी दुःख न दें।",
      "meaning": "Never hurt anyone through thoughts, words, or actions",
      "author": "आचार्य समन्तभद्र"
    },
    {
      "id": 5,
      "quote": "अपरिग्रह (अनावश्यक संग्रह न करना) मनुष्य को हल्का और स्वतंत्र बनाता है।",
      "meaning": "Non-possessiveness brings true freedom",
      "author": "आचार्य उमास्वामी"
    },
    {
      "id": 6,
      "quote": "जो स्वयं पर विजय प्राप्त कर लेता है, उसकी विजय सर्वश्रेष्ठ है।",
      "meaning": "Conquering oneself is the greatest victory",
      "author": "भगवान ऋषभदेव"
    },
    {
      "id": 7,
      "quote": "सभी जीवों के प्रति दया रखो, सभी जीवों को अपना समझो।",
      "meaning": "Compassion for all creatures is true wisdom",
      "author": "आचार्य हरिभद्र सूरी"
    },
    {
      "id": 8,
      "quote": "अंतरंग शुद्धि (आत्मा की शुद्धि) ही सच्ची पूजा है।",
      "meaning": "Purification of the soul is the highest worship",
      "author": "आचार्य अमृतचन्द्र"
    },
    {
      "id": 9,
      "quote": "ज्ञान के बिना मुक्ति संभव नहीं है।",
      "meaning": "Liberation is impossible without knowledge",
      "author": "आचार्य हेमचन्द्र"
    },
    {
      "id": 10,
      "quote": "धैर्य और सहनशीलता सफलता की कुंजी हैं।",
      "meaning": "Patience and tolerance are keys to success",
      "author": "भगवान चंद्रप्रभु"
    },
    {
      "id": 11,
      "quote": "सच्चा त्यागी वही है जो मोह और लोभ का त्याग कर दे।",
      "meaning": "True renunciation is abandoning attachment and greed",
      "author": "आचार्य तरुणसागर"
    },
    {
      "id": 12,
      "quote": "संयम ही सच्चा बल है।",
      "meaning": "Self-restraint is true strength",
      "author": "भगवान नेमिनाथ"
    },
    {
      "id": 13,
      "quote": "अपने आप को जानो, यही सबसे बड़ा ज्ञान है।",
      "meaning": "Self-knowledge is the greatest wisdom",
      "author": "भगवान वासुपूज्य"
    },
    {
      "id": 14,
      "quote": "सभी जीवों की सेवा ही ईश्वर की सच्ची पूजा है।",
      "meaning": "Serving all beings is true worship of God",
      "author": "आचार्य विद्यानंद"
    },
    {
      "id": 15,
      "quote": "सादगी में ही सच्चा सुख निहित है।",
      "meaning": "True happiness lies in simplicity",
      "author": "आचार्य शांतिसागर"
    },
    {
      "id": 16,
      "quote": "अहंकार सभी दुखों का मूल है।",
      "meaning": "Ego is the root of all suffering",
      "author": "भगवान अजितनाथ"
    },
    {
      "id": 17,
      "quote": "मौन सबसे बड़ा उपदेश है।",
      "meaning": "Silence is the greatest teaching",
      "author": "आचार्य भिक्षु"
    },
    {
      "id": 18,
      "quote": "प्रेम और करुणा ही सच्चा धर्म है।",
      "meaning": "Love and compassion are the true religion",
      "author": "भगवान शांतिनाथ"
    },
    {
      "id": 19,
      "quote": "सच्चा ज्ञानी वही है जो स्वयं को जानता है।",
      "meaning": "Only those who know themselves are truly wise",
      "author": "आचार्य राजेंद्र सूरी"
    },
    {
      "id": 20,
      "quote": "ईर्ष्या मनुष्य को अंदर से खोखला कर देती है।",
      "meaning": "Jealousy hollows a person from within",
      "author": "भगवान अभिनंदननाथ"
    },
    {
      "id": 21,
      "quote": "सच्चा ब्रह्मचर्य मन की पवित्रता है।",
      "meaning": "True celibacy is purity of mind",
      "author": "आचार्य जिनसेन"
    },
    {
      "id": 22,
      "quote": "धर्म का मार्ग सरल है, परंतु उस पर चलना कठिन।",
      "meaning": "The path of dharma is simple but hard to follow",
      "author": "भगवान सुमतिनाथ"
    },
    {
      "id": 23,
      "quote": "सच्चा त्याग वही है जो मन से किया जाए।",
      "meaning": "True renunciation happens at the mental level",
      "author": "आचार्य यशोविजय"
    },
    {
      "id": 24,
      "quote": "अपने कर्मों पर विश्वास रखो, भाग्य पर नहीं।",
      "meaning": "Trust your actions, not fate",
      "author": "भगवान धर्मनाथ"
    },
    {
      "id": 25,
      "quote": "सच्चा धन ज्ञान है।",
      "meaning": "True wealth is knowledge",
      "author": "आचार्य शुभचंद्र"
    },
    {
      "id": 26,
      "quote": "सभी प्राणियों में एक ही आत्मा का वास है।",
      "meaning": "The same soul resides in all beings",
      "author": "भगवान शीतलनाथ"
    },
    {
      "id": 27,
      "quote": "सच्चा सुख आत्मा में है, बाहर नहीं।",
      "meaning": "True happiness lies within, not outside",
      "author": "आचार्य जयसेन"
    },
    {
      "id": 28,
      "quote": "अपने दोषों को देखो, दूसरों के नहीं।",
      "meaning": "See your own faults, not others'",
      "author": "भगवान कुंथुनाथ"
    },
    {
      "id": 29,
      "quote": "सच्चा प्रेम बिना शर्त के होता है।",
      "meaning": "True love is unconditional",
      "author": "आचार्य गुणभद्र"
    },
    {
      "id": 30,
      "quote": "सभी जीवों के प्रति समभाव रखो।",
      "meaning": "Maintain equanimity towards all beings",
      "author": "भगवान अरनाथ"
    },
    {
      "id": 31,
      "quote": "सच्चा ज्ञान स्वयं को जानने में है।",
      "meaning": "True knowledge lies in knowing oneself",
      "author": "आचार्य नेमिचंद्र"
    },
    {
      "id": 32,
      "quote": "मोह सभी बंधनों का कारण है।",
      "meaning": "Attachment is the cause of all bondage",
      "author": "भगवान मल्लिनाथ"
    },
    {
      "id": 33,
      "quote": "सच्चा संतोष सबसे बड़ा धन है।",
      "meaning": "True contentment is the greatest wealth",
      "author": "आचार्य पद्मप्रभ"
    },
    {
      "id": 34,
      "quote": "सभी प्राणियों के प्रति करुणा रखो।",
      "meaning": "Have compassion for all creatures",
      "author": "भगवान मुनिसुव्रतनाथ"
    },
    {
      "id": 35,
      "quote": "सच्चा धर्म प्रेम और करुणा है।",
      "meaning": "True religion is love and compassion",
      "author": "आचार्य शिवकोटि"
    },
    {
      "id": 36,
      "quote": "अपने मन को नियंत्रित करो, यही सबसे बड़ा योग है।",
      "meaning": "Controlling the mind is the greatest yoga",
      "author": "भगवान नमिनाथ"
    },
    {
      "id": 37,
      "quote": "सच्चा त्याग मन से होता है।",
      "meaning": "True renunciation happens in the mind",
      "author": "आचार्य जिनदत्त सूरी"
    },
    {
      "id": 38,
      "quote": "सभी जीवों के प्रति दया ही सच्चा धर्म है।",
      "meaning": "Compassion towards all beings is true religion",
      "author": "भगवान नेमिनाथ"
    },
    {
      "id": 39,
      "quote": "सच्चा ज्ञान स्वयं की खोज में है।",
      "meaning": "True knowledge lies in self-discovery",
      "author": "आचार्य विजयानंद"
    },
    {
      "id": 40,
      "quote": "अपने कर्मों का फल अवश्य मिलता है।",
      "meaning": "One inevitably reaps the fruits of their actions",
      "author": "भगवान पुष्पदंतनाथ"
    },
    {
      "id": 41,
      "quote": "सच्चा सुख आत्मा की शांति में है।",
      "meaning": "True happiness lies in peace of soul",
      "author": "आचार्य विमलसागर"
    },
    {
      "id": 42,
      "quote": "सभी प्राणियों के प्रति प्रेम रखो।",
      "meaning": "Have love for all creatures",
      "author": "भगवान वारिषेण"
    },
    {
      "id": 43,
      "quote": "सच्चा धर्म सभी को साथ लेकर चलना है।",
      "meaning": "True religion includes everyone",
      "author": "आचार्य जिनचंद्र"
    },
    {
      "id": 44,
      "quote": "अहिंसा ही सच्ची शक्ति है।",
      "meaning": "Non-violence is true power",
      "author": "भगवान महावीर"
    },
    {
      "id": 45,
      "quote": "जो आत्मा को जान लेता है, वह संसार के बंधनों से मुक्त हो जाता है।",
      "meaning": "One who knows the soul becomes free from worldly bonds",
      "author": "आचार्य कुन्दकुन्द"
    },
    {
      "id": 46,
      "quote": "अंधकार में डूबा हुआ मन ही वास्तविक अज्ञान है, नेत्रहीनता नहीं।",
      "meaning": "A mind immersed in darkness is true ignorance, not blindness",
      "author": "आचार्य उमास्वामी"
    },
    {
      "id": 47,
      "quote": "कर्म का सूक्ष्म सत्य यह है कि प्रत्येक विचार एक बीज है जो भविष्य का वृक्ष बनेगा।",
      "meaning": "The subtle truth of karma is that every thought becomes a future tree",
      "author": "भगवान पार्श्वनाथ"
    },
    {
      "id": 48,
      "quote": "मोह वह जाल है जो आत्मा को भौतिकता में उलझाए रखता है।",
      "meaning": "Attachment is the net that traps the soul in materialism",
      "author": "आचार्य हरिभद्र"
    },
    {
      "id": 49,
      "quote": "सच्चा त्याग वह है जब तुम संसार को नहीं, संसार के प्रति अपने मोह को त्याग दो।",
      "meaning": "True renunciation is abandoning attachment to the world, not the world itself",
      "author": "आचार्य समन्तभद्र"
    },
    {
      "id": 50,
      "quote": "आत्मा का स्वभाव शुद्ध ज्ञान है, अज्ञान उस पर धूल के समान है।",
      "meaning": "The soul's nature is pure knowledge, ignorance is like dust on it",
      "author": "भगवान ऋषभदेव"
    },
    {
      "id": 51,
      "quote": "जो समय के साथ बहता है, वह दुःख के सागर में डूब जाता है।",
      "meaning": "One who flows with time drowns in the ocean of sorrow",
      "author": "आचार्य अमृतचन्द्र"
    },
    {
      "id": 52,
      "quote": "सच्ची अहिंसा वह है जब तुम्हारे विचार भी किसी को पीड़ा न दें।",
      "meaning": "True non-violence is when even your thoughts don't hurt anyone",
      "author": "आचार्य हेमचन्द्र"
    },
    {
      "id": 53,
      "quote": "ज्ञान की सबसे बड़ी बाधा यह भ्रम है कि हम जानते हैं।",
      "meaning": "The greatest obstacle to knowledge is the illusion that we know",
      "author": "भगवान नेमिनाथ"
    },
    {
      "id": 54,
      "quote": "संसार एक दर्पण है, जो तुम्हारे भीतर देखने का साहस दिखाओगे तो सत्य दिखेगा।",
      "meaning": "The world is a mirror - if you dare to look within, you'll see truth",
      "author": "आचार्य पूज्यपाद"
    },
    {
      "id": 55,
      "quote": "सच्चा ध्यान वह है जब विचारों का प्रवाह रुक जाए पर चेतना जागृत रहे।",
      "meaning": "True meditation is when thought flow stops but consciousness remains awake",
      "author": "भगवान चंद्रप्रभु"
    },
    {
      "id": 56,
      "quote": "कर्म का गणित इतना सूक्ष्म है कि एक पल का विचार भी भविष्य को गढ़ देता है।",
      "meaning": "Karma's mathematics is so subtle that even a moment's thought shapes the future",
      "author": "आचार्य यशोविजय"
    },
    {
      "id": 57,
      "quote": "जो स्वयं को जान लेता है, उसके लिए संपूर्ण ब्रह्मांड रहस्य नहीं रह जाता।",
      "meaning": "For one who knows oneself, the entire universe ceases to be a mystery",
      "author": "भगवान वासुपूज्य"
    },
    {
      "id": 58,
      "quote": "मुक्ति का मार्ग उतना ही संकरा है जितना तलवार की धार।",
      "meaning": "The path to liberation is as narrow as a sword's edge",
      "author": "आचार्य जिनसेन"
    },
    {
      "id": 59,
      "quote": "सच्चा संयम वह है जब इंद्रियाँ नहीं, मन की वृत्तियाँ नियंत्रित हो जाएँ।",
      "meaning": "True restraint is when not just senses but mental tendencies are controlled",
      "author": "भगवान अजितनाथ"
    },
    {
      "id": 60,
      "quote": "जो समझता है कि 'मैं कर्ता हूँ', वह बंधन में है; जो जानता है कि 'सब होता है', वह मुक्त है।",
      "meaning": "One who thinks 'I am the doer' is bound; one who knows 'everything happens' is free",
      "author": "आचार्य शुभचंद्र"
    },
    {
      "id": 61,
      "quote": "आत्मा का प्रकाश अनंत है, पर हम उसे शरीर रूपी दीपक में खोजते हैं।",
      "meaning": "The soul's light is infinite, yet we search for it in the lamp of the body",
      "author": "भगवान शांतिनाथ"
    },
    {
      "id": 62,
      "quote": "सच्चा साधक वह है जो प्रतिक्षण मरता और जन्मता है, पर आत्मा में स्थित रहता है।",
      "meaning": "A true seeker dies and is reborn every moment while abiding in the soul",
      "author": "आचार्य विद्यानंद"
    },
    {
      "id": 63,
      "quote": "ज्ञान वह दीपक है जो अज्ञान के अंधकार को नहीं, अंधकार के भ्रम को दूर करता है।",
      "meaning": "Knowledge is the lamp that dispels the illusion of darkness, not darkness itself",
      "author": "भगवान कुंथुनाथ"
    },
    {
      "id": 64,
      "quote": "संसार में सब कुछ परिवर्तनशील है, केवल परिवर्तन ही स्थिर है।",
      "meaning": "Everything in the world changes; only change is constant",
      "author": "आचार्य तरुणसागर"
    },
    {
      "id": 65,
      "quote": "मुक्ति कोई स्थान नहीं, आत्मा की वह अवस्था है जहाँ कोई बंधन नहीं।",
      "meaning": "Liberation isn't a place but a state of soul where no bondage exists",
      "author": "भगवान अरनाथ"
    },
    {
      "id": 66,
      "quote": "सच्चा त्यागी वह है जिसने 'त्याग करने वाले' के भाव को भी त्याग दिया।",
      "meaning": "A true renunciant has even renounced the notion of being a renunciant",
      "author": "आचार्य नेमिचंद्र"
    },
    {
      "id": 67,
      "quote": "समय नहीं, चेतना की गहराई ही सत्य को उजागर करती है।",
      "meaning": "Not time, but depth of consciousness reveals truth",
      "author": "भगवान मल्लिनाथ"
    },
    {
      "id": 68,
      "quote": "जो स्वयं को जान लेता है, उसके लिए संसार स्वप्न के समान हो जाता है।",
      "meaning": "For one who knows oneself, the world becomes like a dream",
      "author": "आचार्य पद्मप्रभ"
    },
    {
      "id": 69,
      "quote": "सच्चा ब्रह्मचर्य मन की वह निर्मलता है जहाँ कामना का अंकुर भी न फूटे।",
      "meaning": "True celibacy is that purity of mind where desire doesn't even sprout",
      "author": "भगवान मुनिसुव्रत"
    },
    {
      "id": 70,
      "quote": "ज्ञान की पराकाष्ठा वह है जब जानने वाला और ज्ञान एक हो जाएँ।",
      "meaning": "The pinnacle of knowledge is when knower and knowing become one",
      "author": "आचार्य शिवकोटि"
    },
    {
      "id": 71,
      "quote": "सच्ची प्रार्थना वह है जब मौन भी बोलने लगे।",
      "meaning": "True prayer is when silence begins to speak",
      "author": "भगवान नमिनाथ"
    },
    {
      "id": 72,
      "quote": "आत्मा अनंत है, पर हम उसे शरीर रूपी सीमा में बाँध देते हैं।",
      "meaning": "The soul is infinite, yet we confine it within bodily limits",
      "author": "आचार्य जिनदत्त"
    },
    {
      "id": 73,
      "quote": "सच्चा धर्म मनुष्य को बाहर नहीं, भीतर की यात्रा पर ले जाता है।",
      "meaning": "True religion takes one not outward but on an inward journey",
      "author": "भगवान पुष्पदंत"
    },
    {
      "id": 74,
      "quote": "मृत्यु शरीर का नाश है, आत्मा का नहीं; जो यह जान लेता है वह कभी नहीं मरता।",
      "meaning": "Death is destruction of body, not soul; one who knows this never dies",
      "author": "आचार्य विमलसागर"
    },
    {
      "id": 75,
      "quote": "सच्चा साधक वह है जो संसार में रहकर भी संसार से परे रहता है।",
      "meaning": "A true seeker lives in the world yet remains beyond it",
      "author": "भगवान वारिषेण"
    },
    {
      "id": 76,
      "quote": "अहंकार वह दीवार है जो आत्मा को परमात्मा से अलग करती है।",
      "meaning": "Ego is the wall separating soul from the supreme soul",
      "author": "आचार्य जिनचंद्र"
    },
    {
      "id": 77,
      "quote": "सच्ची भक्ति वह है जहाँ भक्त और भगवान का भेद मिट जाए।",
      "meaning": "True devotion is where distinction between devotee and God dissolves",
      "author": "भगवान महावीर"
    },
    {
      "id": 78,
      "quote": "जो समय के साथ बहता है वह बह जाता है, जो समय से परे है वही स्थिर है।",
      "meaning": "What flows with time passes away; only the timeless remains",
      "author": "आचार्य कुन्दकुन्द"
    },
    {
      "id": 79,
      "quote": "सच्चा गुरु वह है जो तुम्हें स्वयं के भीतर झाँकना सिखाए।",
      "meaning": "A true guru teaches you to look within yourself",
      "author": "भगवान पार्श्वनाथ"
    },
    {
      "id": 80,
      "quote": "ज्ञान वह दर्पण है जो वास्तविकता को बिना किसी विकृति के दिखाता है।",
      "meaning": "Knowledge is the mirror that shows reality without distortion",
      "author": "आचार्य हरिभद्र"
    },
    {
      "id": 81,
      "quote": "सच्ची मुक्ति वह है जहाँ मुक्ति की इच्छा भी शांत हो जाए।",
      "meaning": "True liberation is when even the desire for liberation ceases",
      "author": "भगवान ऋषभदेव"
    },
    {
      "id": 82,
      "quote": "आत्मा का स्वरूप निराकार है, साकार की खोज उसका अपहरण है।",
      "meaning": "The soul is formless; seeking it in forms is its abduction",
      "author": "आचार्य उमास्वामी"
    },
    {
      "id": 83,
      "quote": "सच्चा धर्म मनुष्य को उसकी दिव्यता का स्मरण कराता है।",
      "meaning": "True religion reminds humans of their divinity",
      "author": "भगवान नेमिनाथ"
    },
    {
      "id": 84,
      "quote": "जो स्वयं को जान लेता है, उसके लिए जन्म-मृत्यु का चक्र समाप्त हो जाता है।",
      "meaning": "For one who knows oneself, the cycle of birth-death ends",
      "author": "आचार्य पूज्यपाद"
    },
    {
      "id": 85,
      "quote": "सच्चा योगी वह है जिसका मन सागर की तरह गहरा और झील की तरह शांत हो।",
      "meaning": "A true yogi has a mind deep as ocean and calm as lake",
      "author": "भगवान चंद्रप्रभु"
    },
    {
      "id": 86,
      "quote": "अज्ञान का अंधकार तभी दूर होता है जब ज्ञान का प्रकाश भीतर से जगे।",
      "meaning": "Darkness of ignorance dispels only when light of knowledge awakens within",
      "author": "आचार्य यशोविजय"
    },
    {
      "id": 87,
      "quote": "सच्चा सत्य वह है जो सभी दृष्टियों में समान रूप से प्रकाशमान हो।",
      "meaning": "Absolute truth shines equally in all perspectives",
      "author": "भगवान वासुपूज्य"
    },
    {
      "id": 88,
      "quote": "आत्मा की यात्रा अकेले ही करनी पड़ती है, कोई साथ नहीं दे सकता।",
      "meaning": "The soul's journey must be undertaken alone; none can accompany",
      "author": "आचार्य अमृतचन्द्र"
    },
    {
      "id": 89,
      "quote": "जो समझ गया कि सब कुछ क्षणभंगुर है, वही शाश्वत को पा सकता है।",
      "meaning": "Only one who understands everything is transient can attain the eternal",
      "author": "भगवान महावीर"
    },
    {
      "id": 90,
      "quote": "सच्चा ध्यान वह है जहाँ ध्याता, ध्यान और ध्येय एक हो जाएँ।",
      "meaning": "True meditation is when meditator, meditation and object merge",
      "author": "आचार्य कुन्दकुन्द"
    },
    {
      "id": 91,
      "quote": "ज्ञान का अंतिम सत्य यह है कि जानने के लिए कुछ भी शेष न रहे।",
      "meaning": "The ultimate truth of knowledge is that nothing remains to be known",
      "author": "भगवान पार्श्वनाथ"
    },
    {
      "id": 92,
      "quote": "सच्चा विरक्त वह है जिसे विरक्त होने का भान भी न हो।",
      "meaning": "A truly detached one isn't even aware of being detached",
      "author": "आचार्य हरिभद्र"
    },
    {
      "id": 93,
      "quote": "आत्मज्ञान वह दर्पण है जिसमें संपूर्ण ब्रह्मांड दिखाई देता है।",
      "meaning": "Self-knowledge is the mirror reflecting the entire cosmos",
      "author": "भगवान ऋषभदेव"
    },
    {
      "id": 94,
      "quote": "सच्ची समाधि वह है जहाँ समाधि का विचार भी न रहे।",
      "meaning": "True samadhi is when even the thought of samadhi disappears",
      "author": "आचार्य उमास्वामी"
    },
    {
      "id": 95,
      "quote": "मुक्ति का अर्थ है - 'मैं' के भाव का पूर्ण विलय।",
      "meaning": "Liberation means complete dissolution of the 'I' notion",
      "author": "भगवान नेमिनाथ"
    },
    {
      "id": 96,
      "quote": "जो देखता है वही दृष्टा है, दृश्य नहीं।",
      "meaning": "The seer is what sees, not what is seen",
      "author": "आचार्य पूज्यपाद"
    },
    {
      "id": 97,
      "quote": "सच्चा सन्यास वह है जहाँ त्याग का अहंकार भी त्याग दिया जाए।",
      "meaning": "True renunciation is when even the ego of renouncing is renounced",
      "author": "भगवान चंद्रप्रभु"
    },
    {
      "id": 98,
      "quote": "आत्मा का स्वभाव है - होना, जानना और आनंदित होना।",
      "meaning": "The soul's nature is existence, consciousness and bliss",
      "author": "आचार्य यशोविजय"
    },
    {
      "id": 99,
      "quote": "सच्चा तप वह है जो बिना तपस्वी के भाव के किया जाए।",
      "meaning": "True austerity is practiced without the notion of being an ascetic",
      "author": "भगवान वासुपूज्य"
    },
    {
      "id": 100,
      "quote": "अंतिम सत्य यह है कि सत्य कोई वस्तु नहीं, बल्कि तुम्हारा स्वभाव है।",
      "meaning": "The ultimate truth is that truth isn't an object but your very nature",
      "author": "आचार्य अमृतचन्द्र"
    },  {
      "id": 101,
      "quote": "जो ऐसा मानता है कि मैं दूसरों को दु:खी या सुखी करता हूँ, वह वस्तुत: अज्ञानी है। ज्ञानी ऐसा कभी नहीं मानते।",
      "author": "कुन्दकुन्दाचार्य"
    },
    {
      "id": 102,
      "quote": "उन द्रव्य-जातियों की समस्त विद्यमान और अविद्यमान पर्यायें तात्कालिक पर्यायों की भाँति, विशिष्टता-पूर्वक ज्ञान में वर्तती हैं।",
      "author": "कुन्दकुन्दाचार्य"
    },
    {
      "id": 103,
      "quote": "पर के कारण मूर्ख ज्ञानी नहीं हो सकता और ज्ञानी मूर्ख नहीं हो सकता। पर पदार्थ धर्मास्तिकाय के समान निमित्त-मात्र है।",
      "author": "आचार्य पूज्यपाद"
    },
    {
      "id": 104,
      "quote": "तीनों काल में सदा विषम, सर्व क्षेत्र के अनेक प्रकार के समस्त पदार्थों को जिनदेव का ज्ञान एक साथ जानता है अहो! ज्ञान का माहात्म्य!",
      "author": "कुन्दकुन्दाचार्य"
    },
    {
      "id": 105,
      "quote": "आत्मा पदार्थों को जानता हुआ भी उस रूप परिणमित नहीं होता, उन्हें ग्रहण नहीं करता और उन पदार्थों के रूप में उत्पन्न नहीं होता इसलिये उसे अबन्धक कहा है।",
      "author": "कुन्दकुन्दाचार्य"
    },
    {
      "id": 106,
      "quote": "आत्मा ज्ञान-स्वरूप है, स्वयं ज्ञान ही है; अत: वह ज्ञान के अतिरिक्त और क्या करे? आत्मा पर-भाव का कर्ता है - ऐसा मानना व्यवहारी-जीवों का मोह है, अज्ञान है।",
      "author": "अमृतचंद्राचार्य"
    },
    {
      "id": 107,
      "quote": "चारित्र वास्तव में धर्म है। जो धर्म है वह साम्य है ऐसा कहा है। साम्य मोह-क्षोभ रहित ऐसा आत्मा का परिणाम है।",
      "author": "कुन्दकुन्दाचार्य"
    },
    {
      "id": 108,
      "quote": "जो नयों के पक्षपात को छोड़कर सदा स्वरूप में गुप्त होकर निवास करते हैं, वे ही साक्षात् अमृत का पान करते हैं; क्योंकि उनका चित्त विकल्प-जाल रहित हो गया है और एकदम शान्त हो गया है।",
      "author": "अमृतचंद्राचार्य"
    },
    {
      "id": 109,
      "quote": "कर्म बन्धन से रहित हुए जिसके द्वारा समस्त पर द्रव्य को छोड़कर, ज्ञानमय आत्मा प्राप्त किया गया है, वह ही परम-आत्मा है। अन्तःकरण से समझ।",
      "author": "योगींदुदेव"
    },
    {
      "id": 110,
      "quote": "जैसी निर्मल, ज्ञानमय परम-आत्मा सिद्धशिला में रहती है, वैसी ही परम-आत्मा देहों में रहती है, तू भेद मत कर।",
      "author": "योगींदुदेव"
    },
    {
      "id": 111,
      "quote": "आत्मा, मन रहित, इन्द्रिय रहित, मूर्ति रहित, ज्ञानमय चेतना मात्र है, इन्द्रियों का विषय नहीं है। यह लक्षण बताया गया है।",
      "author": "योगींदुदेव"
    },
    {
      "id": 112,
      "quote": "एक द्रव्य के द्वारा दोनों द्रव्यों का परिणमन किया जा रहा है, ऐसा मुझे प्रतिभासित मत होवे।",
      "author": "अमृतचंद्राचार्य"
    },
    {
      "id": 113,
      "quote": "बेल की तरह मुक्ति को प्राप्त हुए जिस जीव का ज्ञान- ज्ञेय के अभाव में लौटकर परम स्वभाव का प्रतिपादन करके प्रतिबिम्बित हुआ स्थिर हो जाता है।",
      "author": "योगींदुदेव"
    },
    {
      "id": 114,
      "quote": "जिसने आत्म-स्वरूप के विषय में स्थिरता प्राप्त कर ली है, ऐसा योगी बोलते हुए भी नहीं बोलता, चलते हुए भी नहीं चलता और देखते हुए भी नहीं देखता है।",
      "author": "आचार्य पूज्यपाद"
    },
    {
      "id": 115,
      "quote": "यदि प्राणी की दृष्टि तिमिर-नाशक हो तो दीपक से कोई प्रयोजन नहीं है, उसी प्रकार जहाँ आत्मा स्वयं सुख-रूप परिणमन करता है वहाँ विषय क्या कर सकते हैं?",
      "author": "कुन्दकुन्दाचार्य"
    },
    {
      "id": 116,
      "quote": "देखो, भिन्न-भिन्न दिशाओं व देशों से उड़ उड़कर आते हुए पक्षिगण वृक्षों पर आकर रैनबसेरा करते हैं और सबेरा होने पर अपने अपने कार्य के वश से जुदा-जुदा दिशाओं व देशों में उड़ जाते हैं।",
      "author": "आचार्य पूज्यपाद"
    },
    {
      "id": 117,
      "quote": "सर्वदा परिग्रह के रक्षण में, रखने-उठाने एवं सार-सम्हाल में लगे रहने के कारण मनुष्य का मन उसी में आकुल-व्याकुल रहता है अत: उसका स्वाध्याय छूट जाता है, और जो स्वाध्याय ही नहीं करता वह ध्यान कैसे कर सकता है।",
      "author": "आचार्य अमितगति"
    },
    {
      "id": 118,
      "quote": "जैसे नगर का वर्णन करने पर राजा का वर्णन कभी नहीं होता, शरीर के गुणों का स्तवन करने पर केवली के गुणों का स्तवन नहीं होता।",
      "author": "कुन्दकुन्दाचार्य"
    },
    {
      "id": 119,
      "quote": "निदान शल्य प्रशस्त, अप्रशस्त और भोगकृत के भेद से तीन प्रकार का है। मुक्ति-लाभ का कारण रत्नत्रय है और एकमात्र पाप-स्वरूप होने के कारण यह निदान शल्य रत्नत्रय का निषेधक अर्थात् घातक है।",
      "author": "आचार्य अमितगति"
    },
    {
      "id": 120,
      "quote": "आयु गल जाती है, पर मन नहीं गलता, आशा नहीं गलती। मोह तो स्फुरित होता है, परन्तु आत्महित का स्फुरण नहीं होता, इसी से संसार में भ्रमण होता है।",
      "author": "आचार्य योगींदुदेव"
    }
  ]
}

const QuotesPage = () => {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [copied, setCopied] = useState(false);
  const pathname = usePathname();

  // Auto-change quotes every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentQuoteIndex((prev) => (prev + 1) % quotesData.quotes.length);
        setIsTransitioning(false);
      }, 500); // Transition duration
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Load favorites from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedFavorites = JSON.parse(localStorage.getItem('favoriteQuotes') || '[]');
      setFavorites(savedFavorites);
    }
  }, []);

  const handleNext = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % quotesData.quotes.length);
      setIsTransitioning(false);
    }, 500);
  }, []);

  const handlePrev = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentQuoteIndex((prev) => (prev - 1 + quotesData.quotes.length) % quotesData.quotes.length);
      setIsTransitioning(false);
    }, 500);
  }, []);

  const handleCopy = useCallback(() => {
    const quote = quotesData.quotes[currentQuoteIndex];
    navigator.clipboard.writeText(`${quote.quote}\n${quote.meaning}\n- ${quote.author}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [currentQuoteIndex]);

  const handleFavorite = useCallback(() => {
    const quote = quotesData.quotes[currentQuoteIndex];
    let updatedFavorites;
    if (favorites.some((fav) => fav.id === quote.id)) {
      updatedFavorites = favorites.filter((fav) => fav.id !== quote.id);
    } else {
      updatedFavorites = [...favorites, quote];
    }
    setFavorites(updatedFavorites);
    if (typeof window !== 'undefined') {
      localStorage.setItem('favoriteQuotes', JSON.stringify(updatedFavorites));
    }
  }, [favorites, currentQuoteIndex]);

  const currentQuote = quotesData.quotes[currentQuoteIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900/95 to-black/95 text-white flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      <Head>
        <title>Spiritual Quotes | Keval Gyan</title>
        <meta name="description" content="Immerse in profound Jain spiritual quotes from Tirthankaras and Acharyas at Keval Gyan." />
        <meta name="keywords" content="Jain quotes, spiritual wisdom, Keval Gyan, self-realization, liberation" />
        <meta name="author" content="Keval Gyan Team" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Spiritual Quotes | Keval Gyan" />
        <meta property="og:description" content={currentQuote ? `${currentQuote.quote} - ${currentQuote.author}` : 'Profound spiritual quotes'} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://kevalgyan.com${pathname}`} />
      </Head>

      {/* Parallax Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-80 h-80 sm:w-96 sm:h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 right-0 w-80 h-80 sm:w-96 sm:h-96 bg-blue-700/10 rounded-full blur-3xl animate-pulse-slow delay-1000" />
      </div>

      {/* Quote Image */}
      <div className="mt-4 rounded-lg overflow-hidden shadow-lg w-full max-w-[200px] sm:max-w-[300px] z-10">
        <Image
          src="/KshatriyakundMahavirSwami.jpeg"
          alt="Kshatriyakund Mahavir Swami"
          width={300}
          height={200}
          className="w-full h-auto object-cover rounded-lg"
          priority
        />
      </div>

      {/* Quote Card */}
      <div className="max-w-xl sm:max-w-2xl w-full bg-gray-900/30 rounded-3xl shadow-2xl p-4 sm:p-6 lg:p-8 border border-blue-800/20 backdrop-blur-lg transition-all duration-500 hover:shadow-blue-500/20 z-10 group mt-4 sm:mt-6">
        <div className={`transition-all duration-500 transform ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
          <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-100 leading-relaxed mb-4 sm:mb-6 drop-shadow-lg">
            “{currentQuote.quote}”
          </p>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <p className="text-base sm:text-lg text-gray-300 italic mb-3 sm:mb-4">{currentQuote.meaning}</p>
            <p className="text-sm sm:text-base text-gray-400 text-right">— {currentQuote.author}</p>
          </div>
        </div>

        <div className="flex justify-between mt-4 sm:mt-6 gap-2 sm:gap-4">
          <button
            onClick={handleFavorite}
            className={`p-2 sm:p-3 rounded-full transition-all duration-300 transform hover:scale-110 ${
              favorites.some((fav) => fav.id === currentQuote.id)
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700/70 text-gray-200 hover:bg-blue-600'
            }`}
            aria-label={favorites.some((fav) => fav.id === currentQuote.id) ? 'Remove from favorites' : 'Add to favorites'}
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill={favorites.some((fav) => fav.id === currentQuote.id) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
          <button
            onClick={handleCopy}
            className="p-2 sm:p-3 rounded-full bg-gray-700/70 text-gray-200 hover:bg-blue-600 transition-all duration-300 transform hover:scale-110"
            aria-label="Copy quote"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
        </div>
        {copied && (
          <div className="text-blue-400 text-sm sm:text-base mt-3 sm:mt-4 text-center animate-bounce">
            Quote copied to clipboard!
          </div>
        )}
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-center mt-6 sm:mt-8 space-x-4 sm:space-x-6 z-10">
        <button
          onClick={handlePrev}
          className="p-2 sm:p-3 rounded-full bg-gray-700/70 text-gray-200 hover:bg-blue-600 transition-all duration-300 transform hover:scale-110"
          aria-label="Previous quote"
        >
          <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={handleNext}
          className="p-2 sm:p-3 rounded-full bg-gray-700/70 text-gray-200 hover:bg-blue-600 transition-all duration-300 transform hover:scale-110"
          aria-label="Next quote"
        >
          <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Favorites Section */}
      {favorites.length > 0 && (
        <div className="mt-8 sm:mt-12 w-full max-w-xl sm:max-w-2xl z-10">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-200 mb-4 sm:mb-6">Favorite Quotes</h2>
          <div className="grid grid-cols-1 gap-4 sm:gap-6">
            {favorites.map((quote) => (
              <div
                key={quote.id}
                className="bg-gray-800/40 p-4 sm:p-6 rounded-xl border border-blue-800/20 backdrop-blur-sm transition-all duration-300 hover:shadow-blue-500/20"
              >
                <p className="text-base sm:text-lg text-gray-100 mb-2">{quote.quote}</p>
                <p className="text-sm sm:text-base text-gray-300 italic mb-2">{quote.meaning}</p>
                <p className="text-xs sm:text-sm text-gray-400 text-right">— {quote.author}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuotesPage;