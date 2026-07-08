let currentStep = 1;
const totalSteps = 10;
let selectedChurches = [];

// Mock Data for Churches
const churchesData = {
    "Alexandria": {
        "Montaza": ["St. George - Abu Qir", "St. Mary - Assafra", "St. George - Saqf", "St. Mark & St. Peter - Sidi Bishr", "St. George - Sporting"],
        "Mariut": ["St. Mina - Mariut", "St. Mary - Alexandria", "Basilica of Arcadius - Mariout", "St. Menas - Mariout"],
        "Agamy": ["St. Mary & St. George - Agamy", "St. Mina - Agamy"],
        "Amreya": ["St. George - Amreya", "St. Mark - Amreya"],
        "Borg El Arab": ["St. Mary - Borg El Arab", "St. George - Borg El Arab"],
        "Gomrok": ["St. Mary - Gomrok", "St. Nicholas - Gomrok"],
        "Karmooz": ["St. George - Karmooz", "St. Mary - Karmooz"],
        "Manshia": ["St. Mark Coptic Orthodox Cathedral - Manshia"],
        "Mina El Basal": ["St. George - Mina El Basal", "St. Mary - Mina El Basal"],
        "Moharam Bek": ["St. George & St. Anthony - Moharam Bek", "St. Mary - Moharam Bek"],
        "Raml": ["St. Takla - Ibrahemeya", "St. Mary & St. John - Gianaclis", "St. George - Gianaclis", "St. Cyril I - Cleopatra", "St. Menas - Flemeng"],
        "Sidi Gaber": ["St. George - Sidi Gaber", "St. Mary & St. Joseph - Smouha"]
    },
    "Cairo": {
        "Heliopolis": ["St. Mark - Heliopolis", "St. George - Heliopolis", "St. George & St. Abraam - Heliopolis", "Archangel Michael - Sheraton"],
        "Zeitoun": ["St. Mary - Zeitoun", "Virgin Mary Coptic Orthodox Cathedral - Zeitoun", "El Amir Tadros - Zeitoun", "Mari Youhanna - Helmeiet", "St. Timothy - Helmeiet"],
        "Old Cairo": ["St. Barbara - Old Cairo", "Hanging Church - Old Cairo", "St. Sergius and Bacchus - Old Cairo", "St. George - Old Cairo", "St. Mercurius - Old Cairo", "St. Bahnam - Old Cairo", "St. Cyrus & St. John - Old Cairo", "St. Michael al-Qibli - Old Cairo", "St. Shenouda - Old Cairo", "St. Theodore - Old Cairo"],
        "Maadi": ["St. Mark - Maadi", "St. Mary - Maadi", "St. George - Tura", "Archangel Raphael - Maadi"],
        "Nasr City": ["St. Mary & St. Athanasius - Nasr City", "St. Mary - Ard El Golf", "St. Paula - Ard El Golf"],
        "New Cairo": ["St. Mark - New Cairo", "St. George - New Cairo", "St. Gawargios & St. Anthony - New Cairo"],
        "Shoubra": ["St. Mary - Massarra", "St. Athanasius - Shubra", "Archangel Michael - Ghali", "St. George - El Gyoshy", "St. George - Abu El Farag", "St. George - Abu Takeia", "St. Demiana - Baba Doblu", "St. Mary & El Malak - Baba Doblu", "St. Abraam - Shubra", "St. Mark - Shubra", "St. Mary - Rod El Farag", "St. George - El Khamrawia", "St. George - El Sahel", "Abu Sefein & St. Demiana - El Teraa", "St. Mina - El Teraa", "St. Mary - El Wegoh", "St. Mary - Maahad El Banat", "St. Mary - Mahmasha", "Archangel Michael - Tusun"],
        "Mokattam": ["St. Simon the Tanner - Mokattam", "St. Mark - Mokattam", "St. Paul - Mokattam"],
        "Helwan": ["St. George - Helwan", "St. Mary - Helwan", "St. Mina - Helwan", "Archangel Michael - Helwan", "St. Barsoum the Naked - Masara", "St. Mark - 15th of May City", "St. George - Hadayek Helwan"],
        "Zamalek": ["St. Mary - Zamalek"],
        "Downtown (Wust El Balad)": ["St. Mark Cathedral - Azbakeya", "St. Stephen - Azbakeya", "St. Mary - Faggala", "St. Mary & St. Bishoy - al-Ataba", "St. George - Bab al-Sha'riya"],
        "Bulaq": ["St. Demiana - Bulaq", "St. George - Bulaq"],
        "Dar El Salam": ["St. Mary - Dar El Salam", "St. George - Dar El Salam"],
        "El Marg": ["St. Mary - El Marg", "St. George - El Marg"],
        "Matareya": ["St. Mary - Matareya", "St. George - Manshiyat al-Tahrir", "St. Damiana - Matareya", "El Malak & El Romany - Al-Matariyyah"]
    },
    "Giza": {
        "Dokki": ["St. George - Dokki", "St. Mary - Dokki"],
        "Agouza": ["St. George - Agouza"],
        "Mohandeseen": ["St. George - Mohandeseen", "St. Mary - Mohandeseen"],
        "Haram": ["St. George - Haram", "St. Mary - Haram", "St. Mina - Haram"],
        "Faisal": ["St. Mary - Faisal", "St. George - Faisal", "Archangel Michael - Faisal"],
        "Imbaba": ["St. Mary - Imbaba", "St. Mina - Imbaba", "St. George - Imbaba"],
        "6th of October": ["St. Mary & St. Mark - 6th of October", "St. George - 6th of October", "St. John - 6th of October"],
        "Sheikh Zayed": ["St. Mary & St. George - Sheikh Zayed", "St. Mark - Sheikh Zayed"],
        "Badrashin": ["St. George - Badrashin", "St. Mary - Badrashin"],
        "Hawamdiya": ["St. Mohraeel - Hawamdiya", "St. George - Hawamdiya"],
        "Oseem": ["St. Mary - Oseem", "St. George - Oseem"],
        "Kerdasa": ["St. Mary - Kerdasa", "St. George - Kerdasa"],
        "Ayat": ["St. George - Ayat", "St. Mary - Ayat"]
    },
    "Beheira": {
        "Damanhour": ["St. Mary - Damanhour", "Archangel Michael - Damanhour", "St. George - Damanhour"],
        "Kafr El Dawar": ["St. Michael - Kafr El Dawar", "St. George - Kafr El Dawar", "St. Mary - Kafr El Dawar"],
        "Rashid (Rosetta)": ["St. George - Rashid", "St. Mary - Rashid"],
        "Edku": ["St. Mary - Edku", "St. George - Edku"],
        "Abu Hummus": ["St. George - Abu Hummus", "St. Mary - Abu Hummus"],
        "Itay El Barud": ["St. George - Itay El Barud", "St. Mary - Itay El Barud"],
        "Shubrakhit": ["St. George - Shubrakhit", "St. Mary - Shubrakhit"],
        "Kom Hamada": ["St. George - Kom Hamada", "St. Mary - Kom Hamada"],
        "Wadi El Natrun": ["Monastery of Saint Bishoy (Deir Anba Bishoy)", "Monastery of Saint Macarius the Great (Deir Abu Maqar)", "Paromeos Monastery (Deir al-Baramus)", "Syrian Monastery (Deir El-Suryani)"]
    },
    "Damietta": {
        "Damietta City": ["St. Mary - Damietta", "St. George - Damietta"],
        "Faraskur": ["St. George - Faraskur", "St. Mary - Faraskur"],
        "Kafr Saad": ["St. George - Kafr Saad", "St. Mary - Kafr Saad"],
        "Zarqa": ["St. George - Zarqa", "St. Mary - Zarqa"],
        "New Damietta": ["St. Mary & St. George - New Damietta", "St. Mark - New Damietta"]
    },
    "Dakahlia": {
        "Mansoura": ["St. Mary - Mansoura", "Archangel Michael - Mansoura", "St. Anthony & St. Paul - Mansoura", "St. Damiana - Mansoura"],
        "Mit Ghamr": ["St. Mary - Daqadus", "St. George - Mit Ghamr"],
        "Talkha": ["Archangel Michael - Damira", "St. George - Tabanuha"],
        "Dekernes": ["St. George - Dekernes", "St. Mary - Dekernes"],
        "Senbellawein": ["St. Mary - Sinbillawain", "St. George - Senbellawein"],
        "Belqas": ["St. Damiana Monastery - Belqas", "St. George - Belqas"],
        "Aga": ["St. George - Aga", "St. Mary - Aga"],
        "Manzala": ["St. George - Manzala", "St. Mary - Manzala"]
    },
    "Gharbia": {
        "Tanta": ["St. Mary - Tanta", "St. George - Tanta", "Archangel Michael - Tanta", "St. Mary - Ebiar"],
        "El Mahalla El Kubra": ["St. Damiana - Mahalla", "St. George - Mahalla", "St. Mary - Mahalla", "St. Anthony - Mahalla"],
        "Zifta": ["St. Mercurius - Zifta", "St. George - Zifta"],
        "Samanoud": ["St. Abanoub - Samanoud", "St. Mary - Samanoud"],
        "Kafr El Zayat": ["St. George - Kafr El Zayat", "St. Mary - Kafr El Zayat"],
        "Basyoun": ["St. Mina - Basyoun", "St. George - Basyoun"],
        "Kotoor": ["St. George - Kotoor", "St. Mary - Kotoor"],
        "Santa": ["St. George - Santa", "St. Mary - Santa"]
    },
    "Monufia": {
        "Shibin El Kom": ["St. George - Shibin El Kom", "St. Mary - Shibin El Kom", "St. Sarabamun - Shibin El Kom"],
        "Ashmoun": ["St. George - Ashmoun", "St. Mary - Ashmoun"],
        "Menouf": ["St. George - Menouf", "St. Mary - Menouf"],
        "Quweisna": ["St. George - Quweisna", "St. Mary - Quweisna"],
        "Tala": ["St. George - Tala", "St. Mary - Tala"],
        "Bagour": ["St. George - Bagour", "St. Mary - Bagour"],
        "Shohada": ["St. George - Shohada", "St. Mary - Shohada"],
        "Sadat City": ["St. Mary & St. George - Sadat City", "St. Mark - Sadat City"]
    },
    "Qalyubia": {
        "Banha": ["St. Mary - Banha", "St. George - Banha"],
        "Shubra El Kheima": ["St. Mary - Musturud", "St. George - Shubra El Kheima", "St. Mary - Shubra El Kheima"],
        "Qalyub": ["St. George - Qalyub", "St. Mary - Qalyub"],
        "Khanka": ["St. George - Khanka", "St. Mary - Khanka"],
        "Shebin El Qanater": ["St. George - Shebin El Qanater", "St. Mary - Shebin El Qanater"],
        "Tokh": ["St. Philotheus - Sanhira", "St. George - Tokh"],
        "El Qanater El Khayreya": ["St. George - El Qanater", "St. Mary - El Qanater"],
        "Obour City": ["St. Mary & St. George - Obour City", "St. Mark - Obour City"]
    },
    "Sharqia": {
        "Zagazig": ["St. Bishoy & St. Peter - Zagazig", "St. George & St. Takla - Zagazig", "Holy Cross - Zagazig", "Archangel Michael - Zagazig"],
        "10th of Ramadan": ["St. Mary & St. George - 10th of Ramadan", "St. Mark - 10th of Ramadan"],
        "Minya El Qamh": ["St. George - Minya El Qamh", "St. Mary - Minya El Qamh"],
        "Bilbeis": ["St. Mary - Belbeis", "St. George - Bilbeis"],
        "Faqous": ["St. George - Faqous", "St. Mary - Faqous"],
        "Abu Hammad": ["St. George - Abu Hammad", "St. Mary - Abu Hammad"],
        "Husseiniya": ["St. George - Husseiniya", "St. Mary - Husseiniya"],
        "Mashtool El Souk": ["St. George - Mashtool", "St. Mary - Mashtool"]
    },
    "Kafr El Sheikh": {
        "Kafr El Sheikh City": ["St. Mary - Kafr El Sheikh", "St. George - Kafr El Sheikh"],
        "Desouk": ["St. George - Desouk", "St. Mary - Desouk"],
        "Metoubes": ["St. George - Metoubes", "St. Mary - Metoubes"],
        "Fuwwah": ["St. George - Fuwwah", "St. Mary - Fuwwah"],
        "Baltim": ["St. George - Baltim", "St. Mary - Baltim"],
        "Biyala": ["St. George - Biyala", "St. Mary - Biyala"],
        "Kelin": ["St. George - Kelin", "St. Mary - Kelin"]
    },
    "Fayoum": {
        "Fayoum City": ["St. George - Fayoum City", "St. Damiana - Fayoum City", "St. Joseph - Fayoum City", "St. Mina - Fayoum City", "Deir Al-Azab (St. Anba Abraam) - Fayoum", "Monastery of the Archangel Gabriel (Naqlun)"],
        "Senoures": ["St. George - Senoures", "St. Mary - Senoures"],
        "Ibshaway": ["St. George - Ibshaway", "St. Mary - Ibshaway"],
        "Itsa": ["St. George - Itsa", "St. Mary - Itsa"],
        "Tamiya": ["St. George - Tamiya", "St. Mary - Tamiya"],
        "Yousef El Seddik": ["St. George - Yousef El Seddik", "St. Mary - Yousef El Seddik"]
    },
    "Beni Suef": {
        "Beni Suef City": ["St. George - Beni Suef City", "Three Saints (El-Arwam) - Beni Suef City", "St. Mary - Beni Suef City"],
        "Biba": ["St. George - Biba", "St. Mary - Biba"],
        "Naser": ["St. George - Naser", "St. Mary - Naser"],
        "Fashn": ["St. George - Fashn", "St. Mary - Fashn"],
        "Ahnasia": ["St. George - Ahnasia", "St. Mary - Ahnasia"],
        "Sumusta": ["St. George - Sumusta", "St. Mary - Sumusta"],
        "El Wasta": ["St. George - El Wasta", "St. Mary - El Wasta"]
    },
    "Minya": {
        "Minya City": ["St. Mark Cathedral - Minya", "St. George - Minya", "St. Moses the Black - Minya", "St. Mina - Minya"],
        "Samalut": ["Holy Virgin Church - Gabal al-Tayr", "St. Iskhirun - Bayahu", "St. George - Samalut"],
        "Mallawi": ["St. George - Mallawi", "St. Mary - Mallawi"],
        "Maghagha": ["St. George - Maghagha", "St. Mary - Maghagha"],
        "Abu Qurqas": ["St. George - Abu Qurqas", "St. Mary - Abu Qurqas"],
        "Beni Mazar": ["St. George - Beni Mazar", "St. Mary - Beni Mazar"],
        "Deir Mawas": ["St. George - Deir Mawas", "St. Mary - Deir Mawas", "Virgin Mary & Anba Abraam - Delga"],
        "Mataiy": ["St. George - Mataiy", "St. Mary - Mataiy"]
    },
    "Asyut": {
        "Assiut City": [
            "St. Mark Coptic Orthodox Cathedral - Assiut",
            "Archangel Michael Coptic Orthodox Cathedral - Assiut (Bishopric seat)",
            "St. George the Great Martyr Coptic Orthodox Church - Assiut",
            "St. Mary Coptic Orthodox Church - Assiut",
            "St. Mina Coptic Orthodox Church - Assiut",
            "St. Paul Coptic Orthodox Church - Assiut",
            "St. Mouris & St. Verena Coptic Orthodox Church - Assiut",
            "St. Demiana Coptic Orthodox Church - Assiut",
            "Church of the Holy Fortress (St. Michael) - El-Hisn, Old Town Assiut",
            "St. Shenouda Coptic Orthodox Church - Assiut"
        ],
        "Drunka": [
            "Monastery of the Virgin Mary - Drunka (Deir el-Adra, West Mountain of Assiut)",
            "St. Hor (Apa Hor) Monastery - Drunka",
            "Archangel Coptic Orthodox Church - Durunka",
            "Holy Virgin Mary Coptic Orthodox Church - Durunka"
        ],
        "Dairut": [
            "St. George Coptic Orthodox Church - Dairut",
            "St. Mina Coptic Orthodox Church - Dairut",
            "St. Paul the Hermit Coptic Orthodox Church - Dairut",
            "St. Mary Coptic Orthodox Church - Dairut"
        ],
        "Sanabu": [
            "St. Mary & Archangel Michael Coptic Orthodox Church - Sanabu"
        ],
        "Manfalut": [
            "St. George Coptic Orthodox Church - Manfalut",
            "St. Mary Coptic Orthodox Church - Manfalut",
            "Archangel Michael Coptic Orthodox Church - Manfalut"
        ],
        "El Qusiya": [
            "St. George Coptic Orthodox Church - El Qusiya",
            "St. Mary Coptic Orthodox Church - El Qusiya",
            "St. Mercurius Coptic Orthodox Church - Meir"
        ],
        "Deir el-Muharraq": [
            "Monastery of the Virgin Mary al-Muharraq (the Burned Monastery)",
            "Church of St. Mary (known as St. George Church) - Deir el-Muharraq"
        ],
        "Abnub": [
            "St. George Coptic Orthodox Church - Abnub",
            "St. Mark Coptic Orthodox Church - Abnub",
            "St. Mary Coptic Orthodox Church - Abnub",
            "St. Phoebammon (Abi Fam) Coptic Orthodox Church - Abnub"
        ],
        "Jabal Abnub": [
            "Hanging Monastery of St. Mina (Deir Anba Mina El Mo'allaq) - Mount Abnub"
        ],
        "Abu Tig": [
            "St. Mary Coptic Orthodox Church - Abu Tig",
            "St. George Coptic Orthodox Church - Abu Tig"
        ],
        "El Badari": [
            "St. George Coptic Orthodox Church - El Badari",
            "St. Hermina Monastery - Gabal Qau (near El Badari)",
            "Holy Virgin Mary Coptic Orthodox Church - El Badari",
            "St. Shenouda Coptic Orthodox Church - El Badari"
        ],
        "El Ghanayem": [
            "St. Mary Coptic Orthodox Church - El Ghanayem"
        ],
        "Sahel Selim": [
            "St. George Coptic Orthodox Church - Sahel Selim"
        ],
        "Sedfa": [
            "St. Mina Coptic Orthodox Church - Sedfa",
            "St. George Coptic Orthodox Church - Sedfa"
        ],
        "El Fath": [
            "St. Mark Coptic Orthodox Church - El Fath",
            "St. George Coptic Orthodox Church - Beni Mur"
        ]
    },
    "Sohag": {
        "Sohag City": ["St. Mary - Sohag", "St. George - Sohag", "St. Mark - Sohag", "St. Abraam - Sohag", "St. Bisada - Sohag", "White Monastery (Deir Anba Shenouda) - Sohag", "Red Monastery (Deir Anba Bishay) - Sohag"],
        "Akhmim": ["St. George - Akhmim", "St. Mary - Akhmim", "Monastery of the Martyrs - Akhmim", "Archangel Michael Monastery (Salamouni)"],
        "Girga": ["St. George - Girga", "St. Mary - Girga"],
        "Tahta": ["St. George - Tahta", "St. Mary - Tahta"],
        "Tima": ["Abouna Yassa - Tima", "St. George - Tima", "St. Mary - Tima"],
        "Dar El Salam": ["St. George - Dar El Salam", "St. Mary - Dar El Salam"],
        "Al Balyana": ["St. George - Al Balyana", "St. Mary - Al Balyana"],
        "Juhayna": ["St. George - Juhayna", "St. Mary - Juhayna"],
        "El Maragha": ["St. George - El Maragha", "St. Mary - El Maragha"]
    },
    "Qena": {
        "Qena City": ["St. George - Qena City", "St. Mary - Qena City"],
        "Nagaa Hammadi": ["St. Mary Cathedral - Nagaa Hammadi", "St. George - Nagaa Hammadi", "St. Menas - Hiwon"],
        "Qus": ["St. George - Qus", "St. Mary - Qus"],
        "Deshna": ["St. George - Deshna", "St. Mary - Deshna"],
        "Farshut": ["St. George - Farshut", "St. Mary - Farshut"],
        "Abu Tesht": ["St. George - Abu Tesht", "St. Mary - Abu Tesht"],
        "Naqada": ["St. George - Naqada", "St. Mary - Naqada", "St. John - Naqada", "St. George's Monastery (Rezkiat)"],
        "Qift": ["St. George - Qift", "St. Mary - Qift", "St. Mercurius - Qamula"]
    },
    "Luxor": {
        "Luxor City": ["St. Mary - Luxor City", "St. George - Luxor City", "Archangel Michael - Luxor City"],
        "Karnak": ["St. George - Karnak", "St. Mary - Karnak"],
        "Esna": ["St. George - Esna", "St. Mary - Esna"],
        "Armant": ["St. George - Armant", "St. Mary - Armant"],
        "El Bayadeya": ["St. George - El Bayadeya", "St. Mary - El Bayadeya"],
        "El Tod": ["St. Abshai al-Qabrin - Tod", "St. George - El Tod"]
    },
    "Aswan": {
        "Aswan City": ["Archangel Michael Cathedral - Aswan", "St. George - Aswan", "St. Mary - Aswan"],
        "Kom Ombo": ["St. George - Kom Ombo", "St. Mary - Kom Ombo"],
        "Edfu": ["St. Pakhomious Monastery - Edfu", "St. George - Edfu", "St. Mary - Edfu"],
        "Nasr al-Nuba": ["St. George - Nasr al-Nuba", "St. Mary - Nasr al-Nuba"],
        "Daraw": ["St. George - Daraw", "St. Mary - Daraw"]
    },
    "Matrouh": {
        "Marsa Matrouh": ["St. Mary & St. George - Marsa Matrouh", "St. Mark - Marsa Matrouh"],
        "El Alamein": ["St. Mary - El Alamein", "St. George - El Alamein"],
        "Siwa": ["St. George - Siwa"],
        "Dabaa": ["St. George - Dabaa", "St. Mary - Dabaa"],
        "Sidi Barrani": ["St. George - Sidi Barrani"],
        "Sallum": ["St. George - Sallum"]
    },
    "Red Sea": {
        "Hurghada": ["St. Shenouda - Hurghada", "St. Joseph - Hurghada", "Santa Maria - Hurghada"],
        "Safaga": ["St. George - Safaga", "St. Mary - Safaga"],
        "Quseer": ["St. George - Quseer", "St. Mary - Quseer"],
        "Ras Gharib": ["St. George - Ras Gharib", "St. Mary - Ras Gharib"],
        "Marsa Alam": ["St. George - Marsa Alam", "St. Mary - Marsa Alam"],
        "Shalateen": ["St. George - Shalateen"],
        "Halaib": ["St. George - Halaib"]
    },
    "Suez": {
        "Suez District": ["Great St. Anthony - Suez", "St. Mary - Suez", "St. George - Suez"],
        "Arbaeen": ["St. George - Arbaeen", "St. Mary - Arbaeen"],
        "Attaka": ["St. George - Attaka", "St. Mary - Attaka"],
        "Ganayen": ["St. George - Ganayen", "St. Mary - Ganayen"],
        "Faisal": ["St. George - Faisal", "St. Mary - Faisal"]
    },
    "Port Said": {
        "Port Fouad": ["St. George - Port Fouad", "St. Mary - Port Fouad"],
        "Al-Sharq": ["St. Eugénie - Port Said", "St. Mark Cathedral - Port Said", "St. Bishoy - Port Said", "St. Teresa Maronite Church"],
        "Al-Arab": ["St. George - Al-Arab", "St. Mary - Al-Arab"],
        "Al-Manakh": ["St. George - Al-Manakh", "St. Mary - Al-Manakh"],
        "Al-Dawahy": ["St. George - Al-Dawahy", "St. Mary - Al-Dawahy"],
        "Al-Zohour": ["St. George - Al-Zohour", "St. Mary - Al-Zohour"]
    },
    "Ismailia": {
        "Ismailia City": ["St. Mark (French Church) - Ismailia", "St. Mary - Ismailia", "St. George - Ismailia"],
        "Tell El Kebir": ["St. George - Tell El Kebir", "St. Mary - Tell El Kebir"],
        "Qantara West": ["St. George - Qantara West", "St. Mary - Qantara West"],
        "Qantara East": ["St. George - Qantara East", "St. Mary - Qantara East"],
        "Fayed": ["St. George - Fayed", "St. Mary - Fayed"],
        "Abu Suwir": ["St. George - Abu Suwir", "St. Mary - Abu Suwir"],
        "Kassassin": ["St. George - Kassassin", "St. Mary - Kassassin"]
    },
    "North Sinai": {
        "Arish": ["St. George - Arish", "St. Mina & Pope Cyril - Arish", "St. Mary & St. Abanoub - Arish", "St. Mary & Archangel Michael - Arish"],
        "Bir al-Abed": ["St. George - Bir al-Abed", "St. Mary - Bir al-Abed"],
        "Sheikh Zuweid": ["St. George - Sheikh Zuweid"],
        "Rafah": ["St. George - Rafah"],
        "Hassana": ["St. George - Hassana"],
        "Nekhel": ["St. George - Nekhel"]
    },
    "South Sinai": {
        "Sharm El Sheikh": ["Cathedral of Heavenly Sinai - Sharm El Sheikh", "St. Mary & St. Mina - Sharm El Sheikh"],
        "Dahab": ["St. George & St. Mina - Dahab"],
        "Nuweiba": ["St. George & St. Mina - Nuweiba"],
        "Taba": ["St. George & St. Mina - Taba"],
        "El Tor": ["Moses The Prophet & St. Mark - El Tor"],
        "Saint Catherine": ["St. Catherine Monastery"],
        "Ras Sedr": ["St. George & St. Mina - Ras Sedr"],
        "Abu Zenima": ["St. George & St. Mina - Abu Zenima"]
    },
    "New Valley": {
        "Kharga": ["St. George - Kharga", "St. Mary - Kharga"],
        "Dakhla": ["St. George - Dakhla", "St. Mary - Dakhla"],
        "Farafra": ["St. George - Farafra", "St. Mary - Farafra"],
        "Baris": ["St. George - Baris"],
        "Balat": ["St. George - Balat"]
    }
};

const stepTitles = {
    1: "Step 1 of 10: Arabic Name",
    2: "Step 2 of 10: English Name",
    3: "Step 3 of 10: Date of Birth",
    4: "Step 4 of 10: WhatsApp Number",
    5: "Step 5 of 10: Verification",
    6: "Step 6 of 10: Email Address",
    7: "Step 7 of 10: Education",
    8: "Step 8 of 10: Address",
    9: "Step 9 of 10: Church Selection",
    10: "Step 10 of 10: Create Password"
};

function initMultiStepForm() {
    currentStep = 1;
    selectedChurches = [];
    renderSelectedChurchesTags();
    updateUI();
    document.getElementById('register-form').reset();
    document.querySelectorAll('.error-msg').forEach(el => el.classList.add('hidden'));

    const display = document.getElementById('reg-coords-display');
    if (display) display.classList.add('hidden');

    const otpGroup = document.getElementById('otp-input-group');
    if (otpGroup) otpGroup.classList.add('hidden');

    const lang = localStorage.getItem('preferredLanguage') || 'en-us';
    const msg = (window.translations && window.translations[lang] && window.translations[lang]['reg_church_placeholder'])
        || 'Select a governorate first.';

    const churchSelect = document.getElementById('reg-church');
    if (churchSelect) {
        churchSelect.innerHTML = `<option value="">${msg}</option>`;
    }
    const churchWrapper = document.getElementById('church-wrapper');
    if (churchWrapper) {
        churchWrapper.classList.add('hidden');
    }
    const markazWrapper = document.getElementById('markaz-wrapper');
    if (markazWrapper) {
        markazWrapper.classList.add('hidden');
    }
}

function updateUI() {
    document.querySelectorAll('.register-step').forEach(step => {
        step.classList.add('hidden');
        step.classList.remove('active');
    });

    const currentStepEl = document.getElementById(`reg-step-${currentStep}`);
    if (currentStepEl) {
        currentStepEl.classList.remove('hidden');
        currentStepEl.classList.add('active');
    }

    const progress = (currentStep / totalSteps) * 100;
    const fill = document.getElementById('register-progress-fill');
    if (fill) fill.style.width = `${progress}%`;

    const lang = localStorage.getItem('preferredLanguage') || 'en-us';
    const indicator = document.getElementById('step-indicator-text');
    if (indicator) {
        const lang = localStorage.getItem('preferredLanguage') || 'en-us';
        let stepWord = "Step";
        let ofWord = "of";

        if (lang === 'ar-eg') {
            stepWord = "خطوة";
            ofWord = "من";
        } else if (lang === 'fr') {
            stepWord = "Étape";
            ofWord = "sur";
        } else if (lang === 'de') {
            stepWord = "Schritt";
            ofWord = "von";
        }

        // Try to get the translated topic from the active step's label
        const activeLabel = document.querySelector(`#reg-step-${currentStep} .form-label`);
        const topicText = activeLabel ? activeLabel.innerText : "";

        indicator.innerText = `${stepWord} ${currentStep} ${ofWord} ${totalSteps}${topicText ? ' - ' + topicText : ''}`;
    }

    const btnPrev = document.getElementById('btn-prev-step');
    const btnNext = document.getElementById('btn-next-step');
    const btnSubmit = document.getElementById('btn-submit-reg');

    if (btnPrev) {
        if (currentStep === 1) {
            btnPrev.classList.add('hidden');
        } else {
            btnPrev.classList.remove('hidden');
        }
    }

    if (btnNext && btnSubmit) {
        if (currentStep === totalSteps) {
            btnNext.classList.add('hidden');
            btnSubmit.classList.remove('hidden');
        } else {
            btnNext.classList.remove('hidden');
            btnSubmit.classList.add('hidden');
        }
    }

    const btnSkip = document.getElementById('btn-skip-step');
    if (btnSkip) {
        // Show Skip button on optional steps: 5 (Email) and 9 (Photo)
        if (currentStep === 5 || currentStep === 9) {
            btnSkip.classList.remove('hidden');
        } else {
            btnSkip.classList.add('hidden');
        }
    }

    // Adjust height when steps change

    // Adjust height when steps change
    if (typeof adjustCardHeight === 'function') {
        setTimeout(() => adjustCardHeight(), 10);
    }
}

function showError(id, message) {
    const errorEl = document.getElementById(id);
    if (errorEl) {
        errorEl.innerText = message;
        errorEl.classList.remove('hidden');
        if (typeof adjustCardHeight === 'function') adjustCardHeight();
    }
}

function clearError(id) {
    const errorEl = document.getElementById(id);
    if (errorEl) {
        errorEl.innerText = '';
        errorEl.classList.add('hidden');
        if (typeof adjustCardHeight === 'function') adjustCardHeight();
    }
}

async function validateStep(step) {
    let isValid = true;
    const lang = localStorage.getItem('preferredLanguage') || 'en-us';

    const getLocalError = (key, fallback) => {
        if (window.translations && window.translations[lang] && window.translations[lang][key]) {
            return window.translations[lang][key];
        }
        return fallback;
    };

    if (step === 1) {
        // Arabic Name
        const arVal = document.getElementById('reg-arabic-name').value.trim();
        clearError('err-arabic-name');
        const arabicRegex = /^([\u0600-\u06FF\-\']+\s+){3,}[\u0600-\u06FF\-\']+$/;
        if (!arabicRegex.test(arVal)) {
            showError('err-arabic-name', getLocalError('error_arabic_name_regex', 'Please enter exactly 4 names separated by spaces, using only Arabic letters.'));
            isValid = false;
        }
    } else if (step === 2) {
        // English Name
        const enVal = document.getElementById('reg-english-name').value.trim();
        clearError('err-english-name');
        const englishRegex = /^([a-zA-Z\-\']+\s+){3,}[a-zA-Z\-\']+$/;
        if (!englishRegex.test(enVal)) {
            showError('err-english-name', getLocalError('error_english_name_regex', 'Please enter exactly 4 names separated by spaces, using only English letters.'));
            isValid = false;
        }
    } else if (step === 3) {
        // Date of Birth
        const dob = document.getElementById('reg-dob').value;
        clearError('err-dob');
        if (!dob) {
            showError('err-dob', getLocalError('error_dob_required', 'Date of birth is required.'));
            isValid = false;
        }
    } else if (step === 4) {
        // Phone
        const phone = document.getElementById('reg-phone').value.trim();
        const countryCode = document.getElementById('country-code-select').value;
        const digitsOnly = phone.replace(/\D/g, '');
        clearError('err-phone');

        let phoneValid = true;
        if (!phone) {
            showError('err-phone', getLocalError('error_whatsapp_required', 'WhatsApp number is required.'));
            isValid = false; phoneValid = false;
        } else if (countryCode === '+20') {
            if (!/^(10|11|12|15)\d{8}$/.test(digitsOnly)) {
                showError('err-phone', getLocalError('error_phone_invalid', 'Please enter a valid 10-digit Egyptian mobile number (starting with 10, 11, 12, or 15).'));
                isValid = false; phoneValid = false;
            }
        }

        const otpGroup = document.getElementById('otp-input-group');
        if (!otpGroup.classList.contains('hidden')) {
            const otp = document.getElementById('reg-otp').value.trim();
            clearError('err-otp');
            if (otp.length !== 6 || !/^\d{6}$/.test(otp)) {
                showError('err-otp', getLocalError('error_otp_invalid', 'Please enter a valid 6-digit OTP.'));
                isValid = false;
            } else {
                // Confirm with Custom WhatsApp OTP via Cloud Function
                const fullPhoneNumber = countryCode + digitsOnly;
                try {
                    const response = await fetch(getCloudFunctionUrl('verifyWhatsappOtp'), {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            phoneNumber: fullPhoneNumber,
                            userInputCode: otp
                        })
                    });
                    
                    const data = await response.json();
                    if (!response.ok) {
                        throw new Error(data.error || 'Invalid WhatsApp verification code.');
                    }
                    
                    // Native sign in using Custom Token
                    const userCredential = await window.firebaseAuth.signInWithCustomToken(data.token);
                    window.phoneVerified = true;
                    window.firebaseUser = userCredential.user;
                } catch (err) {
                    showError('err-otp', err.message || getLocalError('error_otp_invalid', 'Please enter a valid 6-digit OTP.'));
                    isValid = false;
                }
            }
        } else if (phoneValid) {
            showError('err-phone', getLocalError('error_otp_missing', 'Please verify your phone number by sending and entering the OTP.'));
            isValid = false;
        }
    } else if (step === 5) {
        // Email
        const email = document.getElementById('reg-email').value.trim();
        clearError('err-email');
        if (email) {
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                showError('err-email', getLocalError('error_email_invalid', 'Please enter a valid email address.'));
                isValid = false;
            } else {
                const linkSentGroup = document.getElementById('email-link-sent-group');
                if (linkSentGroup && linkSentGroup.classList.contains('hidden')) {
                    showError('err-email', getLocalError('error_otp_missing', 'Please verify your email by sending the link.'));
                    isValid = false;
                } else {
                    const msg = lang === 'ar-eg'
                        ? 'الرجاء الضغط على رابط التحقق المرسل لبريدك الإلكتروني للمتابعة.'
                        : 'Please check your email and click the verification link to proceed.';
                    showError('err-email', msg);
                    isValid = false;
                }
            }
        }
    } else if (step === 6) {
        // Education
        const edu = document.getElementById('reg-education').value.trim();
        clearError('err-education');
        if (!edu) {
            showError('err-education', getLocalError('error_education_required', 'Please enter your educational institution.'));
            isValid = false;
        }
    } else if (step === 7) {
        // Address & GPS
        const address = document.getElementById('reg-address').value.trim();
        const hasCoords = !document.getElementById('reg-coords-display').classList.contains('hidden');
        clearError('err-address');

        if (!address && !hasCoords) {
            showError('err-address', getLocalError('error_address_required', 'Please enter your full address or capture coordinates.'));
            isValid = false;
        }
    } else if (step === 8) {
        // Church
        clearError('err-gov');
        clearError('err-church');

        if (selectedChurches.length === 0) {
            const gov = document.getElementById('reg-gov').value;
            const church = document.getElementById('reg-church').value;

            if (!gov) {
                showError('err-gov', getLocalError('error_gov_required', 'Please select a governorate.'));
            } else if (!church) {
                showError('err-church', getLocalError('error_church_missing', 'Please select at least 1 church.'));
            }
            isValid = false;
        } else if (selectedChurches.length > 5) {
            showError('err-church', getLocalError('error_church_max', 'You can select a maximum of 5 churches.'));
            isValid = false;
        }
    } else if (step === 9) {
        // Photo (Optional, so no strict validation needed)
        // If we added photo validation, it would go here.
    } else if (step === 10) {
        // Password
        const pass = document.getElementById('reg-password').value;
        const confirm = document.getElementById('reg-confirm-password').value;
        clearError('err-password');
        clearError('err-confirm-password');

        if (!pass || pass.length < 6) {
            showError('err-password', getLocalError('error_password_short', 'Password must be at least 6 characters.'));
            isValid = false;
        }
        if (!confirm) {
            showError('err-confirm-password', getLocalError('error_confirm_password_required', 'Please confirm your password.'));
            isValid = false;
        } else if (pass !== confirm) {
            showError('err-confirm-password', getLocalError('error_passwords_dont_match', 'Passwords do not match.'));
            isValid = false;
        }
    }

    return isValid;
}


// --- Password Strength Checker ---
function checkPasswordStrength() {
    const pass = document.getElementById('reg-password').value;
    const lang = localStorage.getItem('preferredLanguage') || 'en-us';

    const segs = [1, 2, 3, 4].map(n => document.getElementById(`strength-seg-${n}`));
    const label = document.getElementById('strength-label');
    if (!segs[0] || !label) return;

    const colors = { 0: 'var(--bg-tertiary)', 1: '#ef4444', 2: '#f59e0b', 3: '#3b82f6', 4: '#10b981' };

    let score = 0;
    if (pass.length >= 6) score++;
    if (pass.length >= 10) score++;
    if (/[A-Z]/.test(pass) && /[a-z]/.test(pass)) score++;
    if (/[0-9]/.test(pass) && /[^A-Za-z0-9]/.test(pass)) score++;

    const labelMap = {
        'en-us': ['', 'Weak', 'Fair', 'Good', 'Strong'],
        'en-gb': ['', 'Weak', 'Fair', 'Good', 'Strong'],
        'ar-eg': ['', 'ضعيفة', 'مقبولة', 'جيدة', 'قوية'],
        'fr': ['', 'Faible', 'Correcte', 'Bien', 'Forte'],
        'de': ['', 'Schwach', 'Mittel', 'Gut', 'Stark'],
    };

    const labelColor = { 1: '#ef4444', 2: '#f59e0b', 3: '#3b82f6', 4: '#10b981' };

    segs.forEach((seg, i) => {
        seg.style.background = i < score ? colors[score] : colors[0];
    });

    label.textContent = pass.length > 0 ? (labelMap[lang] || labelMap['en-us'])[score] : '';
    label.style.color = pass.length > 0 ? labelColor[score] || 'var(--text-muted)' : 'var(--text-muted)';

    if (typeof adjustCardHeight === 'function') adjustCardHeight();
}


async function nextStep() {
    if (await validateStep(currentStep)) {
        if (currentStep < totalSteps) {
            currentStep++;
            updateUI();
        }
    }
}

function skipStep() {
    // Step 5 (Email) and Step 9 (Photo) are optional
    if (currentStep === 5) {
        document.getElementById('reg-email').value = '';
        clearError('err-email');
        if (currentStep < totalSteps) { currentStep++; updateUI(); }
    } else if (currentStep === 9) {
        // Skip the photo step
        clearError('err-photo');
        if (currentStep < totalSteps) { currentStep++; updateUI(); }
    }
}

function prevStep() {
    if (currentStep > 1) {
        currentStep--;
        updateUI();
    }
}

function calculateAge() {
    const dobInput = document.getElementById('reg-dob').value;
    const display = document.getElementById('age-display');

    if (!dobInput) {
        if (display) display.innerText = '';
        return;
    }

    const dob = new Date(dobInput);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
        age--;
    }

    if (display) {
        const lang = localStorage.getItem('preferredLanguage') || 'en-us';
        if (age < 0) {
            display.innerText = lang === 'ar-eg' ? 'تاريخ غير صالح' : 'Invalid date';
            display.style.color = '#ef4444';
        } else {
            const ageTxt = lang === 'ar-eg' ? 'العمر' : 'Age';
            const yearsTxt = lang === 'ar-eg' ? 'سنة' : 'years';
            display.innerText = `${ageTxt}: ${age} ${yearsTxt}`;
            display.style.color = 'var(--accent)';
        }
    }
}

function setupRecaptcha() {
    if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
            'size': 'invisible',
            'callback': (response) => {
                // reCAPTCHA solved, allow sending the SMS
            }
        });
    }
}

const getCloudFunctionUrl = (name) => {
    const projectId = "at-church-e3570";
    const region = "us-central1";
    if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
        return `http://127.0.0.1:5001/${projectId}/${region}/${name}`;
    }
    return `https://${name}-${projectId}.${region}.cloudfunctions.net/${name}`;
};

function sendOtp() {
    const phone = document.getElementById('reg-phone').value.trim();
    const countryCode = document.getElementById('country-code-select').value;
    const digitsOnly = phone.replace(/\D/g, '');
    const lang = localStorage.getItem('preferredLanguage') || 'en-us';
    clearError('err-phone');

    if (!phone) {
        const msg = lang === 'ar-eg' ? 'يرجى إدخال رقم الواتساب أولاً.' : 'Please enter WhatsApp number first.';
        showError('err-phone', msg);
        return;
    }

    if (countryCode === '+20') {
        if (!/^(10|11|12|15)\d{8}$/.test(digitsOnly)) {
            const msg = lang === 'ar-eg' ? 'يرجى إدخال رقم هاتف مصري صحيح.' : 'Please enter a valid 10-digit Egyptian mobile number.';
            showError('err-phone', msg);
            return;
        }
    }

    const btn = document.getElementById('btn-send-otp');
    btn.disabled = true;

    const sendingTxt = (window.translations && window.translations[lang] && window.translations[lang]['btn_sending_otp']) || 'Sending...';
    btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> <span>${sendingTxt}</span>`;

    const fullPhoneNumber = countryCode + digitsOnly;

    fetch(getCloudFunctionUrl('sendWhatsappOtp'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber: fullPhoneNumber })
    })
    .then(async (response) => {
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error || 'Failed to send WhatsApp code');
        }
        
        const sentTxt = (window.translations && window.translations[lang] && window.translations[lang]['btn_sent_otp']) || 'Code Sent';
        btn.innerHTML = `<i class="fa-solid fa-check"></i> <span>${sentTxt}</span>`;
        btn.classList.add('btn-outline');
        btn.classList.remove('btn-secondary');

        // Check if devCode is returned to display a helpful mock overlay for local testing
        if (data.devMode && data.devCode) {
            console.log(`[Dev Mode] WhatsApp verification code is: ${data.devCode}`);
            const noticeEl = document.getElementById('phone-otp-notice');
            if (noticeEl) {
                const noticeText = lang === 'ar-eg'
                    ? `[الوضع التجريبي] رمز التحقق هو: ${data.devCode}`
                    : `[Development Mode] WhatsApp Code is: ${data.devCode}`;
                noticeEl.textContent = noticeText;
            }
        } else {
            const noticeEl = document.getElementById('phone-otp-notice');
            if (noticeEl) {
                const noticeText = lang === 'ar-eg'
                    ? 'الرجاء إدخال الرمز المكون من ٦ أرقام المرسل عبر واتساب.'
                    : 'Please enter the 6-digit code sent to your WhatsApp.';
                noticeEl.textContent = noticeText;
            }
        }

        // Reveal the OTP input group within step 4
        document.getElementById('otp-input-group').classList.remove('hidden');

        if (typeof adjustCardHeight === 'function') adjustCardHeight();
    })
    .catch((error) => {
        btn.disabled = false;
        btn.innerHTML = `<span>${(window.translations && window.translations[lang] && window.translations[lang]['btn_send_otp']) || 'Send Verification Code'}</span>`;
        showError('err-phone', error.message);
    });
}

function sendEmailOtp() {
    const email = document.getElementById('reg-email').value.trim();
    const lang = localStorage.getItem('preferredLanguage') || 'en-us';
    clearError('err-email');

    if (!email) {
        const msg = lang === 'ar-eg' ? 'يرجى إدخال البريد الإلكتروني أولاً.' : 'Please enter an email address first.';
        showError('err-email', msg);
        return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        const msg = lang === 'ar-eg' ? 'يرجى إدخال بريد إلكتروني صحيح.' : 'Please enter a valid email address.';
        showError('err-email', msg);
        return;
    }

    const btn = document.getElementById('btn-send-email-otp');
    btn.disabled = true;

    const sendingTxt = (window.translations && window.translations[lang] && window.translations[lang]['btn_sending_otp']) || 'Sending...';
    btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> <span>${sendingTxt}</span>`;

    // 1. Gather current registration form state to preserve it
    const formState = {
        arabicName: document.getElementById('reg-arabic-name').value.trim(),
        englishName: document.getElementById('reg-english-name').value.trim(),
        dob: document.getElementById('reg-dob').value,
        phone: document.getElementById('reg-phone').value.trim(),
        countryCode: document.getElementById('country-code-select').value,
        phoneVerified: true,
        gender: document.querySelector('input[name="gender"]:checked')?.value || '',
        selectedChurches: selectedChurches,
        currentStep: 6 // Land them on step 6 once verified
    };
    
    // Save to localStorage
    localStorage.setItem('pendingRegistrationState', JSON.stringify(formState));
    localStorage.setItem('emailForSignIn', email);

    // 2. Configure Action Settings for Email Link Auth
    const actionCodeSettings = {
        url: window.location.href.split('?')[0].split('#')[0], 
        handleCodeInApp: true,
    };

    // 3. Send sign in link to email
    window.firebaseAuth.sendSignInLinkToEmail(email, actionCodeSettings)
        .then(() => {
            const sentTxt = (window.translations && window.translations[lang] && window.translations[lang]['btn_sent_otp']) || 'Link Sent';
            btn.innerHTML = `<i class="fa-solid fa-check"></i> <span>${sentTxt}</span>`;
            btn.classList.add('btn-outline');
            btn.classList.remove('btn-secondary');

            // Reveal success status text message
            document.getElementById('email-link-sent-group').classList.remove('hidden');

            if (typeof adjustCardHeight === 'function') adjustCardHeight();
        })
        .catch((error) => {
            btn.disabled = false;
            btn.innerHTML = `<span>${(window.translations && window.translations[lang] && window.translations[lang]['btn_send_email_link']) || 'Send Verification Link'}</span>`;
            if (error.code === 'auth/operation-not-allowed') {
                showError('err-email', 'Email Link sign-in is disabled. Please enable Email Link (Passwordless) in the Firebase Console (under Authentication > Sign-in method).');
            } else {
                showError('err-email', error.message);
            }
        });
}

function updatePhonePlaceholder(select) {
    // Update the country code prefix text
    document.getElementById('country-code-display').innerText = select.value;

    // Update the placeholder based on common country codes
    const phoneInput = document.getElementById('reg-phone');
    const code = select.value;

    const phonePlaceholders = {
        '+1': '(555) 123-4567',
        '+7': '912 345 67 89',
        '+20': '100 123 4567',
        '+27': '82 123 4567',
        '+30': '691 234 5678',
        '+31': '6 12345678',
        '+32': '470 12 34 56',
        '+33': '6 12 34 56 78',
        '+34': '612 34 56 78',
        '+36': '30 123 4567',
        '+39': '312 345 6789',
        '+40': '712 345 678',
        '+41': '79 123 45 67',
        '+43': '664 1234567',
        '+44': '7911 123456',
        '+45': '12 34 56 78',
        '+46': '70 123 45 67',
        '+47': '412 34 567',
        '+48': '512 345 678',
        '+49': '151 23456789',
        '+51': '912 345 678',
        '+52': '55 1234 5678',
        '+53': '5 123 4567',
        '+54': '11 1234-5678',
        '+55': '11 91234-5678',
        '+56': '9 1234 5678',
        '+57': '312 345 6789',
        '+58': '412 123 4567',
        '+60': '12-345 6789',
        '+61': '412 345 678',
        '+62': '812 3456 7890',
        '+63': '912 345 6789',
        '+64': '21 123 4567',
        '+65': '8123 4567',
        '+66': '81 234 5678',
        '+81': '90 1234 5678',
        '+82': '10-1234-5678',
        '+84': '91 234 5678',
        '+86': '131 2345 6789',
        '+90': '501 234 56 78',
        '+91': '91234 56789',
        '+92': '300 1234567',
        '+93': '70 123 4567',
        '+94': '71 234 5678',
        '+95': '9 123 456 789',
        '+98': '912 345 6789',
        '+211': '912 345 678',
        '+212': '612 34 56 78',
        '+213': '551 23 45 67',
        '+216': '21 234 567',
        '+218': '91 123 4567',
        '+220': '712 3456',
        '+221': '77 123 45 67',
        '+222': '41 23 45 67',
        '+223': '71 23 45 67',
        '+224': '621 23 45 67',
        '+226': '70 12 34 56',
        '+227': '90 12 34 56',
        '+228': '90 12 34 56',
        '+229': '90 12 34 56',
        '+230': '5123 4567',
        '+231': '77 123 4567',
        '+232': '77 123456',
        '+233': '24 123 4567',
        '+234': '801 234 5678',
        '+235': '66 12 34 56',
        '+236': '70 12 34 56',
        '+237': '612 34 56 78',
        '+239': '901 23 45',
        '+240': '222 12 34 56',
        '+241': '07 12 34 56',
        '+242': '06 123 4567',
        '+244': '912 345 678',
        '+245': '95 123 4567',
        '+248': '2 123 456',
        '+249': '91 234 5678',
        '+250': '78 123 4567',
        '+251': '91 123 4567',
        '+252': '61 234 5678',
        '+253': '77 12 34 56',
        '+254': '712 345678',
        '+255': '712 345 678',
        '+256': '712 345678',
        '+257': '71 23 45 67',
        '+258': '82 123 4567',
        '+260': '95 123 4567',
        '+261': '32 12 345 67',
        '+263': '71 234 5678',
        '+264': '81 123 4567',
        '+265': '88 123 4567',
        '+266': '52 12 34 56',
        '+267': '71 234 567',
        '+268': '7612 3456',
        '+269': '321 2345',
        '+291': '7 12 34 56',
        '+351': '912 345 678',
        '+352': '621 234 567',
        '+353': '85 123 4567',
        '+354': '812 3456',
        '+355': '67 123 4567',
        '+356': '7912 3456',
        '+357': '99 123456',
        '+358': '40 123 4567',
        '+359': '88 123 4567',
        '+370': '612 34 567',
        '+371': '21 234 567',
        '+372': '512 3456',
        '+373': '69 123456',
        '+374': '91 23 45 67',
        '+375': '29 123 45 67',
        '+376': '312 345',
        '+377': '6 12 34 56 78',
        '+378': '66 123 4567',
        '+379': '312 345 6789',
        '+380': '50 123 45 67',
        '+381': '60 1234567',
        '+382': '67 123 456',
        '+385': '91 234 5678',
        '+386': '31 234 567',
        '+387': '61 234 567',
        '+389': '70 123 456',
        '+420': '601 234 567',
        '+421': '901 234 567',
        '+423': '79 123 45 67',
        '+501': '612 3456',
        '+502': '5123 4567',
        '+503': '7123 4567',
        '+504': '9123 4567',
        '+505': '8123 4567',
        '+506': '8123 4567',
        '+507': '6123 4567',
        '+509': '3123 4567',
        '+591': '7123 4567',
        '+592': '612 3456',
        '+593': '9 1234 5678',
        '+595': '981 123 456',
        '+597': '812 3456',
        '+598': '91 234 567',
        '+670': '7712 3456',
        '+673': '812 3456',
        '+674': '555 1234',
        '+675': '7123 4567',
        '+676': '71 234',
        '+677': '71 23456',
        '+678': '712 3456',
        '+679': '712 3456',
        '+680': '771 2345',
        '+685': '71 23456',
        '+686': '72 12345',
        '+688': '201234',
        '+691': '320 1234',
        '+692': '625 1234',
        '+850': '191 234 5678',
        '+855': '12 345 678',
        '+856': '20 12 345 678',
        '+880': '171 234 5678',
        '+960': '712 3456',
        '+961': '71 234 567',
        '+962': '7 9123 4567',
        '+963': '931 234 567',
        '+964': '750 123 4567',
        '+965': '5123 4567',
        '+966': '50 123 4567',
        '+967': '712 345 678',
        '+968': '7123 4567',
        '+970': '591 234 567',
        '+971': '50 123 4567',
        '+972': '50 123 4567',
        '+973': '3123 4567',
        '+974': '3312 3456',
        '+975': '17 12 34 56',
        '+976': '99 12 34 56',
        '+977': '981 234 5678',
        '+992': '90 123 4567',
        '+993': '61 23 45 67',
        '+994': '50 123 45 67',
        '+995': '599 12 34 56',
        '+996': '700 12 34 56',
        '+998': '90 123 45 67'
    };

    const placeholderText = phonePlaceholders[code] || '123 456 7890';
    phoneInput.placeholder = placeholderText;

    // Dynamically limit the input length to match the placeholder format
    phoneInput.maxLength = placeholderText.length;
}

// Initialize placeholder and limit on page load
window.addEventListener('load', () => {
    const countrySelect = document.getElementById('country-code-select');
    if (countrySelect) {
        updatePhonePlaceholder(countrySelect);
    }
});

function getCoordinates() {
    const lang = localStorage.getItem('preferredLanguage') || 'en-us';
    const btn = document.getElementById('btn-get-coords');

    if (navigator.geolocation) {
        btn.disabled = true;
        btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i>`;

        setTimeout(() => {
            document.getElementById('reg-coords-display').classList.remove('hidden');
            const txt = (window.translations && window.translations[lang] && window.translations[lang]['btn_get_coordinates']) || 'Get Current Location (Coordinates)';
            btn.innerHTML = `<i class="fa-solid fa-location-dot"></i> <span>${txt}</span>`;
            btn.disabled = false;
        }, 1200);
    } else {
        const msg = lang === 'ar-eg' ? 'خدمة تحديد الموقع غير متوفرة في متصفحك.' : 'Geolocation is not supported by this browser.';
        alert(msg);
    }
}

function populateChurchesForGov() {
    const gov = document.getElementById('reg-gov').value;
    const markazSelect = document.getElementById('reg-markaz');
    const markazWrapper = document.getElementById('markaz-wrapper');
    const churchSelect = document.getElementById('reg-church');
    const churchWrapper = document.getElementById('church-wrapper');
    const churchSearchWrapper = document.getElementById('church-search-wrapper');

    // Reset selections
    markazSelect.innerHTML = '<option value="" data-translate-key="reg_markaz_placeholder">Select District/Diocese...</option>';
    churchSelect.innerHTML = '<option value="" data-translate-key="reg_church_placeholder">Select District first...</option>';
    document.getElementById('church-search').value = '';

    if (!gov) {
        markazWrapper.classList.add('hidden');
        churchWrapper.classList.add('hidden');
        churchSearchWrapper.classList.add('hidden');
        return;
    }

    const marakez = churchesData[gov] || {};
    const districtNames = Object.keys(marakez).sort();

    if (districtNames.length === 0) {
        markazWrapper.classList.add('hidden');
        churchWrapper.classList.add('hidden');
        churchSearchWrapper.classList.add('hidden');
        return;
    }

    markazWrapper.classList.remove('hidden');
    churchWrapper.classList.add('hidden');
    churchSearchWrapper.classList.add('hidden');

    districtNames.forEach(district => {
        const opt = document.createElement('option');
        opt.value = district;
        opt.innerText = district;
        markazSelect.appendChild(opt);
    });
}

function populateChurchesForMarkaz() {
    const gov = document.getElementById('reg-gov').value;
    const markaz = document.getElementById('reg-markaz').value;
    const churchSelect = document.getElementById('reg-church');
    const churchWrapper = document.getElementById('church-wrapper');
    const churchSearchWrapper = document.getElementById('church-search-wrapper');

    churchSelect.innerHTML = '<option value="" data-translate-key="reg_church_placeholder">Select Church...</option>';
    document.getElementById('church-search').value = '';

    if (!gov || !markaz) {
        churchWrapper.classList.add('hidden');
        churchSearchWrapper.classList.add('hidden');
        return;
    }

    const marakez = churchesData[gov] || {};
    const churches = marakez[markaz] || [];

    if (churches.length === 0) {
        churchWrapper.classList.add('hidden');
        churchSearchWrapper.classList.add('hidden');
        return;
    }

    churchWrapper.classList.remove('hidden');
    churchSearchWrapper.classList.remove('hidden');

    let sortedChurches = [...churches].sort();

    sortedChurches.forEach(church => {
        const opt = document.createElement('option');
        opt.value = church;
        opt.innerText = church;
        churchSelect.appendChild(opt);
    });
}

function filterChurches() {
    const query = document.getElementById('church-search').value.toLowerCase();
    const churchSelect = document.getElementById('reg-church');
    const options = churchSelect.getElementsByTagName('option');

    let hasVisibleOptions = false;

    for (let i = 1; i < options.length; i++) { // Skip the first placeholder option
        const text = options[i].innerText.toLowerCase();
        if (text.includes(query)) {
            options[i].style.display = '';
            hasVisibleOptions = true;
        } else {
            options[i].style.display = 'none';
        }
    }

    // Reset selection if the currently selected option is hidden
    if (churchSelect.selectedIndex > 0 && options[churchSelect.selectedIndex].style.display === 'none') {
        churchSelect.selectedIndex = 0;
    }

    if (typeof adjustCardHeight === 'function') adjustCardHeight();
}

function handleChurchSelect() {
    const churchSelect = document.getElementById('reg-church');
    if (!churchSelect) return;

    const church = churchSelect.value;
    if (!church) return;

    const lang = localStorage.getItem('preferredLanguage') || 'en-us';
    clearError('err-church');

    // Check limit
    if (selectedChurches.length >= 5) {
        showError('err-church', (window.translations && window.translations[lang] && window.translations[lang]['error_church_max']) || 'You can select a maximum of 5 churches.');
        churchSelect.value = '';
        return;
    }

    // Check duplicate
    if (selectedChurches.includes(church)) {
        const dupMsg = lang === 'ar-eg' ? 'تم اختيار هذه الكنيسة بالفعل.' : 'This church is already selected.';
        showError('err-church', dupMsg);
        churchSelect.value = '';
        return;
    }

    selectedChurches.push(church);
    renderSelectedChurchesTags();

    // Reset dropdowns for next selection
    document.getElementById('reg-gov').value = '';
    document.getElementById('reg-markaz').value = '';
    churchSelect.value = '';

    document.getElementById('markaz-wrapper').classList.add('hidden');
    document.getElementById('church-wrapper').classList.add('hidden');
    document.getElementById('church-search-wrapper').classList.add('hidden');
}

function renderSelectedChurchesTags() {
    const container = document.getElementById('selected-churches-tags');
    if (!container) return;

    container.innerHTML = '';

    selectedChurches.forEach((church, index) => {
        const tag = document.createElement('span');
        tag.className = 'church-tag';
        tag.style.display = 'inline-flex';
        tag.style.alignItems = 'center';
        tag.style.gap = '0.25rem';
        tag.style.padding = '0.25rem 0.75rem';
        tag.style.background = 'var(--bg-tertiary)';
        tag.style.border = '1px solid var(--border-color)';
        tag.style.borderRadius = '20px';
        tag.style.fontSize = '0.8rem';
        tag.style.color = 'var(--text-dark)';

        tag.innerHTML = `
            <span>${church}</span>
            <i class="fa-solid fa-xmark" style="cursor: pointer; color: var(--text-muted); font-size: 0.75rem;" onclick="removeSelectedChurch(${index})"></i>
        `;
        container.appendChild(tag);
    });

    if (typeof adjustCardHeight === 'function') adjustCardHeight();
}

function removeSelectedChurch(index) {
    selectedChurches.splice(index, 1);
    renderSelectedChurchesTags();
}

async function handleMultiStepRegister(e) {
    e.preventDefault();

    // If user presses Enter before the final step, just move to the next step
    if (currentStep < totalSteps) {
        await nextStep();
        return;
    }

    if (!await validateStep(currentStep)) return;

    const lang = localStorage.getItem('preferredLanguage') || 'en-us';
    const loginAlert = document.getElementById('auth-alert');

    // Gather all form data
    let email = document.getElementById('reg-email').value.trim();
    const phone = document.getElementById('reg-phone').value.trim();
    
    // If email was skipped (it is optional), generate a synthetic email for Firebase Auth
    // so they can still log in using their Phone Number + Password
    if (!email) {
        const cleanPhone = phone.replace(/[^0-9]/g, '');
        email = `${cleanPhone}@phone.atchurch.app`;
    }
    
    const password = document.getElementById('reg-password').value;
    const arabicName = document.getElementById('reg-arabic-name').value.trim();
    const englishName = document.getElementById('reg-english-name').value.trim();
    const dob = document.getElementById('reg-dob').value;
    const gender = document.querySelector('input[name="gender"]:checked')?.value || '';
    const education = document.getElementById('reg-education').value.trim();
    const address = document.getElementById('reg-address').value.trim();
    const gov = document.getElementById('reg-gov').value;
    const markaz = document.getElementById('reg-markaz').value;
    const church = document.getElementById('reg-church').value;

    try {
        let user = window.firebaseAuth.currentUser;
        
        if (user) {
            // Link email and password credentials to the existing authenticated user
            const credential = firebase.auth.EmailAuthProvider.credential(email, password);
            try {
                const linkResult = await user.linkWithCredential(credential);
                user = linkResult.user;
            } catch (linkError) {
                console.error("Error linking credential during registration:", linkError);
                if (linkError.code !== 'auth/provider-already-linked' && linkError.code !== 'auth/email-already-in-use') {
                    throw linkError;
                }
            }
        } else {
            // No current session, create brand new email/password account
            const userCredential = await window.firebaseAuth.createUserWithEmailAndPassword(email, password);
            user = userCredential.user;
        }

        // 2. Save the extra profile data to Firestore
        await window.firebaseDb.collection("users").doc(user.uid).set({
            uid: user.uid,
            email: email,
            phone: phone,
            username: englishName, // Map English name to username for now
            arabicName: arabicName,
            englishName: englishName,
            dob: dob,
            gender: gender,
            education: education,
            address: address,
            governorate: gov,
            markaz: markaz,
            church: church,
            selectedChurches: selectedChurches,
            createdAt: window.firebaseDb.FieldValue ? window.firebaseDb.FieldValue.serverTimestamp() : new Date().toISOString()
        });

        // Clear restoration state
        localStorage.removeItem('pendingRegistrationState');
        localStorage.removeItem('emailForSignIn');

        loginAlert.className = '';
        loginAlert.style.backgroundColor = 'rgba(16, 185, 129, 0.15)';
        loginAlert.style.color = 'var(--success)';
        loginAlert.style.border = '1px solid rgba(16, 185, 129, 0.3)';
        loginAlert.textContent = lang === 'ar-eg' ? 'تم إنشاء الحساب بنجاح! جاري تحويلك...' : 'Account created successfully! Redirecting...';

        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1500);

    } catch (error) {
        loginAlert.className = '';
        loginAlert.style.backgroundColor = 'rgba(239, 68, 68, 0.15)';
        loginAlert.style.color = 'var(--crimson)';
        loginAlert.style.border = '1px solid rgba(239, 68, 68, 0.3)';
        loginAlert.textContent = 'Registration Error: ' + error.message;
        if (typeof adjustCardHeight === 'function') adjustCardHeight();
    }
}


// ==========================================
// Photo Upload & Editor Logic (Step 9)
// ==========================================

let photoImage = null;
let photoScale = 1;
let photoRotation = 0;
let photoPanX = 0;
let photoPanY = 0;
let isDraggingPhoto = false;
let dragStartX = 0;
let dragStartY = 0;
let cameraStream = null;

function handlePhotoUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        const img = new Image();
        img.onload = function () {
            photoImage = img;
            resetPhotoTransforms();
            drawPhoto();
            document.getElementById('photo-placeholder').style.display = 'none';
            document.getElementById('photo-editor-controls').classList.remove('hidden');
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

function resetPhotoTransforms() {
    photoScale = 1;
    photoRotation = 0;
    photoPanX = 0;
    photoPanY = 0;
    const slider = document.getElementById('photo-zoom-slider');
    if (slider) slider.value = 1;
}

function drawPhoto() {
    const canvas = document.getElementById('photo-canvas');
    if (!canvas || !photoImage) return;
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    // Move to center of canvas
    ctx.translate(canvas.width / 2 + photoPanX, canvas.height / 2 + photoPanY);
    ctx.rotate((photoRotation * Math.PI) / 180);
    ctx.scale(photoScale, photoScale);

    // Fit image to cover canvas initially
    const scale = Math.max(canvas.width / photoImage.width, canvas.height / photoImage.height);
    const drawW = photoImage.width * scale;
    const drawH = photoImage.height * scale;

    ctx.drawImage(photoImage, -drawW / 2, -drawH / 2, drawW, drawH);
    ctx.restore();
}

function photoZoomSlider(val) {
    photoScale = parseFloat(val);
    drawPhoto();
}

function photoZoom(delta) {
    const slider = document.getElementById('photo-zoom-slider');
    if (!slider) return;
    let val = parseFloat(slider.value) + delta;
    val = Math.max(slider.min, Math.min(slider.max, val));
    slider.value = val;
    photoZoomSlider(val);
}

function photoRotate(deg) {
    photoRotation = (photoRotation + deg) % 360;
    drawPhoto();
}

function removePhoto() {
    photoImage = null;
    const canvas = document.getElementById('photo-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    document.getElementById('photo-placeholder').style.display = 'flex';
    document.getElementById('photo-editor-controls').classList.add('hidden');
    document.getElementById('photo-file-input').value = '';
    clearError('err-photo');
    if (typeof adjustCardHeight === 'function') adjustCardHeight();
}

// Canvas Drag to Pan
window.addEventListener('load', () => {
    const previewWrap = document.getElementById('photo-preview-wrap');
    if (!previewWrap) return;

    previewWrap.addEventListener('mousedown', (e) => {
        if (!photoImage) return;
        isDraggingPhoto = true;
        dragStartX = e.clientX - photoPanX;
        dragStartY = e.clientY - photoPanY;
        previewWrap.style.cursor = 'grabbing';
    });

    window.addEventListener('mousemove', (e) => {
        if (!isDraggingPhoto) return;
        photoPanX = e.clientX - dragStartX;
        photoPanY = e.clientY - dragStartY;
        drawPhoto();
    });

    window.addEventListener('mouseup', () => {
        isDraggingPhoto = false;
        if (previewWrap) previewWrap.style.cursor = 'grab';
    });
});

// Camera
async function openCamera() {
    const modal = document.getElementById('camera-modal');
    const video = document.getElementById('camera-video');
    if (!modal || !video) return;

    clearError('err-photo');

    try {
        cameraStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
        video.srcObject = cameraStream;
        modal.classList.remove('hidden');
    } catch (err) {
        console.error("Camera error:", err);
        const lang = localStorage.getItem('preferredLanguage') || 'en-us';
        const msg = lang === 'ar-eg' ? 'تعذر الوصول إلى الكاميرا.' : 'Unable to access camera.';
        showError('err-photo', msg);
    }
}

function closeCamera() {
    const modal = document.getElementById('camera-modal');
    if (modal) modal.classList.add('hidden');
    if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
        cameraStream = null;
    }
}

function captureFromCamera() {
    const video = document.getElementById('camera-video');
    if (!video) return;

    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = video.videoWidth;
    tempCanvas.height = video.videoHeight;
    const ctx = tempCanvas.getContext('2d');

    // Draw video frame
    ctx.drawImage(video, 0, 0, tempCanvas.width, tempCanvas.height);

    const img = new Image();
    img.onload = function () {
        photoImage = img;
        resetPhotoTransforms();
        drawPhoto();
        document.getElementById('photo-placeholder').style.display = 'none';
        document.getElementById('photo-editor-controls').classList.remove('hidden');
        closeCamera();
    };
    img.src = tempCanvas.toDataURL('image/jpeg');
}
