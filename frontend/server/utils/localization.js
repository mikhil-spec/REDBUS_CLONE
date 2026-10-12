const templateDictionary = {
  BOOKING_CONFIRMATION: {
    en: {
      title : 'Booking Confirmed - PNR: {{pnr}}',
      message:'Your journey from {{departure}} to {{destination}} on {{busName}} is confirmed. Seats: {{seats}}. Have a safe journey!'
    },
    hi : {
      title:'बुकिंग की पुष्टि हुई - PNR: {{pnr}}',
      message :'{{busName}} पर {{departure}} से {{destination}} की आपकी यात्रा की पुष्टि हो गई है। सीटें: {{seats}}। आपकी यात्रा मंगलमय हो!'
    },
    te :{
      title:'బుకింగ్ నిర్ధారించబడింది - PNR: {{pnr}}',
      message : '{{busName}} లో {{departure}} నుండి {{destination}} కు మీ ప్రయాణం ధృవీకరించబడింది. సీట్లు: {{seats}}। సురక్షిత ప్రయాణం చేయండి!'
    },
    ta : {
      title : 'முன்பதிவு உறுதி செய்யப்பட்டது - PNR: {{pnr}}',
      message : '{{busName}} பேருந்தில் {{departure}} முதல் {{destination}} வரை உங்கள் பயணம் உறுதி செய்யப்பட்டது. இருக்கைகள்: {{seats}}। இனிய பயணம் அமைய வாழ்த்துக்கள்!'
    }
  },
  BOOKING_CANCELLATION: {
    en:{
      title : 'Booking Cancelled - PNR: {{pnr}}',
      message :'Your ticket under PNR {{pnr}} for {{departure}} to {{destination}} has been cancelled. Refund will be processed shortly.'
    },
    hi: {
      title: 'बुकिंग रद्द कर दी गई - PNR: {{pnr}}',
      message : '{{departure}} से {{destination}} के लिए PNR {{pnr}} का आपका टिकट रद्द कर दिया गया है। रिफंड जल्द प्रोसेस किया जाएगा।'
    },
    te :{
      title:'బుకింగ్ రద్దు చేయబడింది - PNR: {{pnr}}',
      message :'{{departure}} నుండి {{destination}} వరకు PNR {{pnr}} కోసం మీ టికెట్ రద్దు చేయబడింది. రీఫండ్ త్వరలో ప్రాసెస్ చేయబడుతుంది.'
    },
    ta : {
      title:'முன்பதிவு ரத்து செய்யப்பட்டது - PNR: {{pnr}}',
      message : '{{departure}} முதல் {{destination}} வரை PNR {{pnr}} க்கான உங்கள் டிக்கெட் ரத்து செய்யப்பட்டது. பணம் விரைவில் திருப்பி அளிக்கப்படும்.'
    }
  },
  JOURNEY_REMINDER: {
    en:{
      title : 'Upcoming Trip Reminder - {{departure}} to {{destination}}',
      message:'Reminder: Your bus {{busName}} departs at {{time}} today from {{boardingPoint}}. Please report 15 minutes before departure.'
    },
    hi:{
      title : 'आगामी यात्रा स्मरणपत्र - {{departure}} से {{destination}}',
      message : 'याद दिलाना: आपकी बस {{busName}} आज {{boardingPoint}} से {{time}} बजे रवाना होगी। कृपया 15 मिनट पहले पहुंचें।'
    },
    te :{
      title:'రాబోయే ప్రయాణ రిమైండర్ - {{departure}} నుండి {{destination}}',
      message :'గుర్తుంచుకోండి: మీ బస్సు {{busName}} ఈరోజు {{boardingPoint}} నుండి {{time}} గంటలకు బయలుదేరుతుంది.'
    },
    ta : {
      title:'பயண நினைவூட்டல் - {{departure}} முதல் {{destination}}',
      message : 'நினைவூட்டல்: உங்கள் பேருந்து {{busName}} இன்று {{boardingPoint}} இடத்திலிருந்து {{time}} மணிக்கு புறப்படுகிறது.'
    }
  },
  SCHEDULE_CHANGE: {
    en:{
      title : 'Schedule Alert: {{busName}}',
      message : 'Departure time for your journey from {{departure}} to {{destination}} (PNR: {{pnr}}) has been revised to {{newTime}}.'
    },
    hi : {
      title : 'समय परिवर्तन सूचना: {{busName}}',
      message: '{{departure}} से {{destination}} (PNR: {{pnr}}) की आपकी यात्रा का प्रस्थान समय बदलकर {{newTime}} कर दिया गया है।'
    },
    te: {
      title: 'సమయ మార్పు హెచ్చరిక: {{busName}}',
      message: '{{departure}} నుండి {{destination}} (PNR: {{pnr}}) మీ ప్రయాణ సమయం {{newTime}} కు మార్చబడింది.'
    },
    ta: {
      title:'நேர மாற்றம் அறிவிப்பு: {{busName}}',
      message : '{{departure}} முதல் {{destination}} (PNR: {{pnr}}) வரை உங்கள் பயண புறப்பாடு நேரம் {{newTime}} ஆக மாற்றப்பட்டுள்ளது.'
    }
  },
  PROMOTIONAL_OFFER: {
    en: {
      title: 'Exclusive Highway Deal: {{discountPercentage}}% Off!',
      message: 'Plan your next weekend trip! Use promo code {{promoCode}} and get {{discountPercentage}}% instant discount on top routes.'
    },
    hi: {
      title:'शानदार ऑफर: {{discountPercentage}}% की विशेष छूट!',
      message: 'अपनी अगली यात्रा की योजना बनाएं! प्रोमो कोड {{promoCode}} का प्रयोग करें और तुरंत {{discountPercentage}}% की छूट पाएं।'
    },
    te: {
      title: 'ప్రత్యేక ఆఫర్: {{discountPercentage}}% తగ్గింపు!',
      message :'మీ తదుపరి పర్యటనను ప్లాన్ చేయండి! ప్రోమో కోడ్ {{promoCode}} ఉపయోగించి {{discountPercentage}}% తగ్గింపును పొందండి.'
    },
    ta: {
      title: 'சிறப்பு சலுகை: {{discountPercentage}}% தள்ளுபடி!',
      message : 'உங்கள் அடுத்த பயணத்தை திட்டமிடுங்கள்! {{promoCode}} குறியீட்டைப் பயன்படுத்தி {{discountPercentage}}% உடனடி தள்ளுபடியைப் பெறுங்கள்.'
    }
  }
};

exports.renderLocalizedTemplate =( eventType, lang= 'en', variables ={}) =>{
  const selectedLang = ['en', 'hi','te', 'ta'].includes(lang) ? lang: 'en';
  const group =templateDictionary[eventType]  || templateDictionary.BOOKING_CONFIRMATION;
  const tpl = group[selectedLang] ||group.en;

  let title = tpl.title ;
  let message= tpl.message;

  Object.keys(variables).forEach(key =>{
    const regex = new RegExp(`{{${key}}}`,  'g');
    title =title.replace(regex , variables[key] || '');
    message = message.replace(regex,variables[key]  || '');
  });

  return { title,message, language: selectedLang};
};