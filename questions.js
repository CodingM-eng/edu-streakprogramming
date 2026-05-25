// questions.js - ADNSU 1st Group Prep Dashboard Sual Bankı
const questionsDatabase = [
  // ==================== RİYAZİYYAT (14 sual) ====================
  {
    id: "m1",
    subject: "Riyaziyyat",
    difficulty: "medium",
    grades: [9, 10, 11],
    question: "f(x) = \\sqrt{\\lg(x^2 - 3x - 3)} funksiyasının təyin oblastına daxil olan ən kiçik müsbət tam ədədi tapın.",
    options: ["3", "4", "5", "2"],
    answer: "4",
    concept: "Kvadrat kök altındakı ifadə mənfi ola bilməz (\\ge 0) və loqarifmaltı ifadə sıfırdan böyük olmalıdır (> 0). Bu iki şərt əsasında sistem bərabərsizliyi qurun və müsbət kökləri araşdırın.",
    explanation: "Kvadrat kök altındakı ifadə mənfi ola bilməz və loqarifmaltı ifadə sıfırdan böyük olmalıdır. Dolayısı ilə:\n1) \\lg(x^2 - 3x - 3) \\ge 0 \\Rightarrow x^2 - 3x - 3 \\ge 10^0 = 1 \\Rightarrow x^2 - 3x - 4 \\ge 0\n2) Kökləri tapaq: (x - 4)(x + 1) \\ge 0 \\Rightarrow x \\in (-\\infty, -1] \\cup [4, \\infty)\nBu oblasta daxil olan ən kiçik müsbət tam ədəd 4-dür."
  },
  {
    id: "m2",
    subject: "Riyaziyyat",
    difficulty: "hard",
    grades: [7, 8, 9, 10, 11],
    question: "Düzbucaqlı üçbucağın daxilinə çəkilmiş çevrənin toxunma nöqtəsi hipotenuzu 5 sm və 12 sm-lik hissələrə bölür. Bu üçbucağın sahəsini tapın.",
    options: ["30 sm²", "60 sm²", "85 sm²", "120 sm²"],
    answer: "60 sm²",
    concept: "Düzbucaqlı üçbucaqda daxilə çəkilmiş çevrə hipotenuzu x və y hissələrinə bölürsə, üçbucağın sahəsi ilə bu seqmentlər arasındakı xüsusi sahə əlaqəsindən istifadə edin: S = x \\cdot y.",
    explanation: "Düzbucaqlı üçbucaqda daxilə çəkilmiş çevrə hipotenuzu x və y seqmentlərinə bölürsə, üçbucağın sahəsi S = x \\cdot y düsturu ilə tapılır.\nSübut: Katetlər (r+x) və (r+y), hipotenuz isə (x+y) olur. Pifaqor teoremi və sadələşdirmədən sonra S = x \\cdot y = 5 \\cdot 12 = 60 sm² alınır."
  },
  {
    id: "m3",
    subject: "Riyaziyyat",
    difficulty: "medium",
    grades: [9, 10, 11],
    question: "\\sin x + \\cos x = \\frac{\\sqrt{6}}{2} olarsa, \\sin 2x-i tapın.",
    options: ["0.25", "0.5", "$\\frac{\\sqrt{2}}{2}$", "1"],
    answer: "0.5",
    concept: "İfadənin hər iki tərəfini kvadrata yüksəldin və \\sin^2 x + \\cos^2 x = 1 eyniliyini, həmçinin 2\\sin x \\cos x = \\sin 2x ikiqat bucaq açılışını tətbiq edin.",
    explanation: "Bərabərliyin hər iki tərəfini kvadrata yüksəldək:\n(\\sin x + \\cos x)^2 = (\\frac{\\sqrt{6}}{2})^2 \\Rightarrow \\sin^2 x + 2\\sin x \\cos x + \\cos^2 x = \\frac{6}{4} = 1.5\nTronometrik eyniliyi (\\sin^2 x + \\cos^2 x = 1) və ikiqat bucaq düsturunu (2\\sin x \\cos x = \\sin 2x) nəzərə alsaq:\n1 + \\sin 2x = 1.5 \\Rightarrow \\sin 2x = 0.5."
  },
  {
    id: "m4",
    subject: "Riyaziyyat",
    difficulty: "medium",
    grades: [10, 11],
    question: "z = (a^2 - 4) + (a - 2)i kompleks ədədi xalis xəyali ədəd olarsa, a-nın qiymətini tapın.",
    options: ["2", "-2", "$\\pm 2$", "0"],
    answer: "-2",
    concept: "Kompleks ədədin z = x + yi xalis xəyali olması üçün onun həqiqi hissəsi sıfıra bərabər (x = 0), lakin xəyali hissəsi sıfırdan fərqli (y \\neq 0) olmalıdır.",
    explanation: "Kompleks ədədin xalis xəyali olması üçün onun həqiqi hissəsi 0-a bərabər olmalı, xəyali hissəsi isə 0-dan fərqli olmalıdır:\n1) Re(z) = a^2 - 4 = 0 \\Rightarrow a = \\pm 2\n2) Im(z) = a - 2 \\neq 0 \\Rightarrow a \\neq 2\nBuradan alınır ki, a = -2."
  },
  {
    id: "m5",
    subject: "Riyaziyyat",
    difficulty: "medium",
    grades: [8, 9, 10, 11],
    question: "\\vec{a}(3; -4) və \\vec{b}(x; 6) vektorları perpendikulyar olarsa, x-i tapın.",
    options: ["-8", "8", "4", "-4"],
    answer: "8",
    concept: "İki vektorun perpendikulyar olması üçün onun skalyar hasili sıfır olmalıdır: \\vec{a} \\cdot \\vec{b} = a_x b_x + a_y b_y = 0.",
    explanation: "İki vektorun perpendikulyar olması üçün onun skalyar hasili sıfır olmalıdır:\n\\vec{a} \\cdot \\vec{b} = a_x b_x + a_y b_y = 0 \\Rightarrow 3x + (-4)(6) = 0 \\Rightarrow 3x - 24 = 0 \\Rightarrow x = 8."
  },
  {
    id: "m6",
    subject: "Riyaziyyat",
    difficulty: "hard",
    grades: [11],
    question: "\\int_{0}^{\\pi} \\sin x \\, dx inteqralını hesablayın.",
    options: ["0", "1", "2", "-2"],
    answer: "2",
    concept: "İnteqralaltı funksiyanın (\\sin x) ibtidai funksiyasını tapın (diqqət: \\int \\sin x dx = -\\cos x) və Nyuton-Leybnis düsturunu tətbiq edin: [F(x)]_a^b = F(b) - F(a).",
    explanation: "\\int \\sin x \\, dx = -\\cos x.\nNyuton-Leybnis düsturuna əsasən:\n[-\\cos x]_0^{\\pi} = -\\cos\\pi - (-\\cos 0) = -(-1) - (-1) = 1 + 1 = 2."
  },
  {
    id: "m7",
    subject: "Riyaziyyat",
    difficulty: "hard",
    grades: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    question: "Qutuda 4 qırmızı və 6 mavi top var. Qutudan təsadüfi çıxarılan 2 topın hər ikisinin qırmızı olması ehtimalını tapın.",
    options: ["\\frac{2}{15}", "\\frac{4}{15}", "\\frac{1}{5}", "\\frac{2}{5}"],
    answer: "\\frac{2}{15}",
    concept: "Ehtimalın klassik düsturunu tətbiq edin: P = M / N. Burada M əlverişli halların sayı (4 qırmızıdan 2-nin seçilməsi), N isə ümumi halların sayısıdır (10 topdan 2-nin seçilməsi). Kombinzon (C_n^k) düsturundan istifadə edin.",
    explanation: "Ümumi elementar hadisələrin sayı: C_{10}^2 = \\frac{10 \\cdot 9}{2} = 45.\nƏlverişli hadisələrin sayı (4 qırmızı topdan 2-sini seçmək): C_4^2 = \\frac{4 \\cdot 3}{2} = 6.\nEhtimal: P = \\frac{C_4^2}{C_{10}^2} = \\frac{6}{45} = \\frac{2}{15}."
  },
  {
    id: "m8",
    subject: "Riyaziyyat",
    difficulty: "medium",
    grades: [7, 8, 9, 10, 11],
    question: "Ədədi silsilədə a_3 + a_9 = 24 olarsa, silsilənin ilk 11 həddinin cəmini tapın.",
    options: ["120", "132", "144", "264"],
    answer: "132",
    concept: "Ədədi silsilənin xassələrini yadınıza salın: indekslərinin cəmi bərabər olan hədlərin özlərinin cəmi də bərabərdir: a_3 + a_9 = a_1 + a_{11}. İlk n həddin cəmi düsturunu tətbiq edin: S_n = \\frac{a_1 + a_n}{2} \\cdot n.",
    explanation: "Ədədi silsilənin xassəsinə görə: a_3 + a_9 = a_1 + a_{11} = 24.\nSilsilənin ilk 11 həddinin cəmi: S_{11} = \\frac{a_1 + a_{11}}{2} \\cdot 11 = \\frac{24}{2} \\cdot 11 = 12 \\cdot 11 = 132."
  },
  {
    id: "m9",
    subject: "Riyaziyyat",
    difficulty: "medium",
    grades: [9, 10, 11],
    question: "\\log_2(x^2 - x) = 1 + \\log_2 x tənliyini həll edin.",
    options: ["0", "2", "3", "0 və 3"],
    answer: "3",
    concept: "Toplama loqarifmik xassəsini tətbiq edin: \\log_a b + \\log_a c = \\log_a(b \\cdot c). Həmçinin 1-i \\log_2 2 kimi yazın. Sonda mütləq tapdığınız köklərin loqarifmaltı ifadəni müsbət edib-etmədiyini yoxlayın.",
    explanation: "Tənliyin loqarifmik xassələrindən istifadə edək:\n\\log_2(x^2 - x) = \\log_2 2 + \\log_2 x \\Rightarrow \\log_2(x^2 - x) = \\log_2(2x)\nBuradan, x^2 - x = 2x \\Rightarrow x^2 - 3x = 0 \\Rightarrow x(x - 3) = 0.\nKöklər x = 0 və x = 3-dür.\nTəyin oblastına görə x > 0 və x^2 - x > 0 olmalıdır. Buna görə x = 0 kənar kökdür. Cavab yeganə olaraq x = 3-dür."
  },
  {
    id: "m10",
    subject: "Riyaziyyat",
    difficulty: "hard",
    grades: [8, 9, 10, 11],
    question: "Tərəfləri 13 sm, 14 sm və 15 sm olan üçbucağın 14 sm-lik tərəfinə çəkilmiş hündürlüyünü tapın.",
    options: ["11.2 sm", "12 sm", "9.6 sm", "10 sm"],
    answer: "12 sm",
    concept: "Üçbucağın üç tərəfi məlum olduqda əvvəlcə yarımperimetri (p) hesablayın, sonra isə Heron düsturu ilə sahəni (S) tapın. Sahə tapıldıqdan sonra hündürlük üçün S = 0.5 \\cdot b \\cdot h_b düsturundan istifadə edin.",
    explanation: "Əvvəlcə yarımperimetri tapaq: p = (13+14+15)/2 = 21 sm.\nHeron düsturu ilə sahəni hesablayaq: S = \\sqrt{p(p-a)(p-b)(p-c)} = \\sqrt{21 \\cdot 8 \\cdot 7 \\cdot 6} = \\sqrt{7056} = 84 sm².\nHündürlük düsturu: S = \\frac{1}{2} b h_b \\Rightarrow 84 = \\frac{1}{2} \\cdot 14 \\cdot h \\Rightarrow h = 12 sm."
  },
  {
    id: "m11",
    subject: "Riyaziyyat",
    difficulty: "medium",
    grades: [7, 8, 9, 10, 11],
    question: "x^2 - 5x + 3 = 0 tənliyinin kökləri x_1 və x_2 olarsa, x_1^2 + x_2^2 ifadəsinin qiymətini tapın.",
    options: ["19", "25", "31", "13"],
    answer: "19",
    concept: "Viyet teoreminə görə köklərin cəmi x_1 + x_2 və hasili x_1 \\cdot x_2-ni müəyyən edin. Sonra x_1^2 + x_2^2 cəmini müxtəsər vurma düsturu köməyilə (x_1+x_2)^2 - 2x_1 x_2 şəklində açaraq qiymətləri yerinə yazın.",
    explanation: "Viyet teoreminə görə köklərin cəmi x_1 + x_2 = 5, hasili isə x_1 \\cdot x_2 = 3-dür.\nMüxtəsər vurma düsturu köməyilə:\nx_1^2 + x_2^2 = (x_1 + x_2)^2 - 2x_1 x_2 = 5^2 - 2(3) = 25 - 6 = 19."
  },
  {
    id: "m12",
    subject: "Riyaziyyat",
    difficulty: "medium",
    grades: [3, 4, 5, 6, 7, 8, 9, 10, 11],
    question: "Çevrə daxilinə çəkilmiş bucaq söykəndiyi qövsdən 40° kiçikdir. Bu bucağın dərəcə ölçüsünü tapın.",
    options: ["40°", "80°", "60°", "120°"],
    answer: "40°",
    concept: "Çevrədə daxilə çəkilmiş bucaq söykəndiyi qövsün dərəcə ölçüsünün yarısına bərabərdir (\\alpha = Qövs / 2). Qövsü 2\\alpha kimi qəbul edərək tənlik qurun.",
    explanation: "Daxilə çəkilmiş bucaq (\\alpha) söykəndiyi qövsün yarısına bərabərdir. Yəni qövs 2\\alpha-dır.\nŞərtə görə: 2\\alpha - \\alpha = 40° \\Rightarrow \\alpha = 40°."
  },
  {
    id: "m13",
    subject: "Riyaziyyat",
    difficulty: "hard",
    grades: [10, 11],
    question: "\\cos 2x = \\sin x tənliyinin [0; \\pi] aralığına daxil olan köklərinin cəmini tapın.",
    options: ["$\\frac{\\pi}{2}$", "$\\frac{5\\pi}{6}$", "$\\pi$", "$\\frac{7\\pi}{6}$"],
    answer: "\\pi",
    concept: "İlk növbədə \\cos 2x = 1 - 2\\sin^2 x düsturu vasitəsilə tənliyi yalnız \\sin x funksiyasından asılı kvadrat tənlik halına gətirin və \\sin x = t əvəzləməsi edib həll edin.",
    explanation: "\\cos 2x = 1 - 2\\sin^2 x düsturundan istifadə edək:\n1 - 2\\sin^2 x = \\sin x \\Rightarrow 2\\sin^2 x + \\sin x - 1 = 0.\n\\sin x = t əvəzləməsi etsək, 2t^2 + t - 1 = 0. Köklər t = 0.5 və t = -1-dir.\n1) \\sin x = 0.5 \\Rightarrow [0; \\pi] aralığında x = \\frac{\\pi}{6} və x = \\frac{5\\pi}{6}.\n2) \\sin x = -1 \\Rightarrow x = \\frac{3\\pi}{2} (aralığa daxil deyil).\nKöklər cəmi: \\frac{\\pi}{6} + \\frac{5\\pi}{6} = \\pi."
  },
  {
    id: "m14",
    subject: "Riyaziyyat",
    difficulty: "hard",
    grades: [8, 9, 10, 11],
    question: "Çevrə xaricindəki nöqtədən çevrəyə toxunan və kəsən çəkilmişdir. Toxunanın uzunluğu 8 sm, kəsənin daxili hissəsi 12 sm olarsa, kəsənin xarici hissəsinin uzunluğunu tapın.",
    options: ["4 sm", "6 sm", "8 sm", "2 sm"],
    answer: "4 sm",
    concept: "Çevrədə toxunan və kəsən teoremini tətbiq edin: toxunanın uzunluğunun kvadratı kəsənin xarici hissəsi ilə ümumi kəsən uzunluğunun hasilinə bərabərdir: d_{tox}^2 = x \\cdot (x + d_{dax}).",
    explanation: "Toxunan və kəsən teoreminə görə toxunanın kvadratı kəsənin xarici hissəsi ilə ümumi uzunluğunun hasilinə bərabərdir:\n8^2 = x \\cdot (x + 12) \\Rightarrow 64 = x^2 + 12x \\Rightarrow x^2 + 12x - 64 = 0.\nKöklər: x = 4 və x = -16 (kənar kök). Beləliklə, xarici hissə 4 sm-dir."
  },

  // ==================== FİZİKA (8 sual) ====================
  {
    id: "p1",
    subject: "Fizika",
    difficulty: "medium",
    grades: [7, 8, 9, 10, 11],
    question: "Şaquli yuxarı atılmış m = 2 kq kütləli cismə hərəkət müddətində təsir edən havanın müqavimət qüvvəsi F_müq = 4 N-dur. Cismin qalxma təcilinin düşmə təcilinə olan nisbətini tapın (g = 10 m/san²).",
    options: ["1.2", "1.5", "2.0", "0.8"],
    answer: "1.5",
    concept: "Cisim yuxarı hərəkət edərkən ağırlıq və müqavimət qüvvələri eyni (aşağı) yönəldiyi üçün toplanır. Aşağı düşərkən isə müqavimət sürətin əksinə (yuxarı) yönəldiyi üçün ağırlıqdan çıxılır. Nyutonun 2-ci qanununu tətbiq edin (a = F_net / m).",
    explanation: "Cisim yuxarı qalxanda müqavimət qüvvəsi və ağırlıq qüvvəsi aşağı yönəlir:\na_qalx = \\frac{mg + F_{müq}}{m} = \\frac{20 + 4}{2} = 12 m/san².\nCisim aşağı düşəndə müqavimət qüvvəsi yuxarı yönəlir, ağırlıq isə aşağı:\na_{düş} = \\frac{mg - F_{müq}}{m} = \\frac{20 - 4}{2} = 8 m/san².\nNisbət: \\frac{a_{qalx}}{a_{düş}} = \\frac{12}{8} = 1.5."
  },
  {
    id: "p2",
    subject: "Fizika",
    difficulty: "medium",
    grades: [7, 8, 9, 10, 11],
    question: "Müstəvi kondensatorun lövhələri arasındakı məsafəni 2 dəfə azaldıb, lövhələr arasındakı dielektrik nüfuzluğunu 4 dəfə artırdıqda onun elektrik tutumu necə dəyişər?",
    options: ["2 dəfə azalar", "8 dəfə artar", "2 dəfə artar", "8 dəfə azalar"],
    answer: "8 dəfə artar",
    concept: "Kondensatorun tutum düsturunu tətbiq edin: C = \\frac{\\epsilon \\epsilon_0 S}{d}. Tutumun lövhələr arasındakı məsafə (d) ilə tərs, dielektrik nüfuzluğu (\\epsilon) ilə düz mütənasib olduğunu nəzərə alın.",
    explanation: "Kondensatorun tutum düsturu: C = \\frac{\\epsilon \\epsilon_0 S}{d}.\nMəsafə (d) 2 dəfə azaldıqda tutum 2 dəfə artır. Dielektrik nüfuzluğu (\\epsilon) 4 dəfə artdıqda tutum 4 dəfə artır. Cəmi dəyişiklik: 2 \\cdot 4 = 8 dəfə artar."
  },
  {
    id: "p3",
    subject: "Fizika",
    difficulty: "medium",
    grades: [7, 8, 9, 10, 11],
    question: "İdeal qazın təzyiqi 3 dəfə artdıqda və həcmi 2 dəfə azaldıqda onun daxili enerjisi necə dəyişər?",
    options: ["1.5 dəfə artar", "6 dəfə artar", "1.5 dəfə azalar", "Dəyişməz"],
    answer: "1.5 dəfə artar",
    concept: "Biratomlu ideal qazın daxili enerji düsturunu yazın: U = \\frac{3}{2} pV. Təzyiqin (p) 3 dəfə artmasını və həcmin (V) 2 dəfə azalmasını hasildə yerinə qoyaraq dəyişmə nisbətini müəyyən edin.",
    explanation: "Daxili enerjinin düsturu: U = \\frac{3}{2} pV.\nTəzyiq (p) 3 dəfə artır, həcm (V) 2 dəfə azalır. pV hasili \\frac{3}{2} = 1.5 dəfə artır. Beləliklə, daxili enerji də 1.5 dəfə artar."
  },
  {
    id: "p4",
    subject: "Fizika",
    difficulty: "hard",
    grades: [10, 11],
    question: "Fokus məsafəsi F = 20 sm olan toplayıcı linzadan cisim hansı məsafədə yerləşdirilməlidir ki, onun həqiqi və özü boyda xəyalı alınsın?",
    options: ["20 sm", "40 sm", "10 sm", "60 sm"],
    answer: "40 sm",
    concept: "Toplayıcı linzada cismin həqiqi, tərs və özü boyda (böyüdülməsi k=1) xəyalının alınması üçün optikanın xüsusi xassəsini xatırlayın: cisim linzadan hansı fokus məsafəsində yerləşməlidir?",
    explanation: "Toplayıcı linzada cismin özü boyda və həqiqi xəyalının alınması üçün cisim ikiqat fokus məsafəsində yerləşdirilməlidir.\nd = 2F = 2 \\cdot 20 = 40 sm."
  },
  {
    id: "p5",
    subject: "Fizika",
    difficulty: "hard",
    grades: [7, 8, 9, 10, 11],
    question: "Cismin sürət tənliyi v_x = 10 - 2t (m/san) şəklindədir. Cisim hərəkətə başlayandan dayanana qədər nə qədər yol gedər?",
    options: ["25 m", "50 m", "10 m", "20 m"],
    answer: "25 m",
    concept: "Cisim dayananda onun son sürəti sıfır (v_son = 0) olur. Sürət tənliyindən istifadə edərək dayanma anına qədər keçən zamanı (t) tapın. Sonra gedilən yolu orta sürətlə zamanın hasili kimi hesablayın: s = \\frac{v_0 + v_{son}}{2} \\cdot t.",
    explanation: "Dayanma anında sürət sıfır olur: 10 - 2t = 0 \\Rightarrow t = 5 san.\nGedilən yol orta sürətlə zamanın hasilinə bərabərdir:\ns = \\frac{v_0 + v_{son}}{2} \\cdot t = \\frac{10 + 0}{2} \\cdot 5 = 25 m."
  },
  {
    id: "p6",
    subject: "Fizika",
    difficulty: "hard",
    grades: [8, 9, 10, 11],
    question: "Üfüqi müstəvidə sükunətdə olan m = 4 kq kütləli cismə üfüqi istiqamətdə F = 12 N qüvvə təsir edir. Sürüşmə sürtünmə əmsalı \\mu = 0.4 olarsa, cismə təsir edən sürtünmə qüvvəsini tapın (g = 10 m/san²).",
    options: ["16 N", "12 N", "8 N", "4 N"],
    answer: "12 N",
    concept: "İlk növbədə sürüşmə sürtünmə qüvvəsinin ala biləcəyi maksimum qiyməti hesablayın: F_sür = \\mu m g. Əgər təsir edən qüvvə bu maksimum qiymətdən kiçikdirsə, cisim tərpənmir. Tərpənməyən cismə təsir edən sükunət sürtünmə qüvvəsi elə ona təsir edən qüvvəyə bərabər olur.",
    explanation: "Maksimum sürtünmə qüvvəsi (sürüşmə sürtünməsi): F_{sür}^{max} = \\mu m g = 0.4 \\cdot 4 \\cdot 10 = 16 N.\nTəsir edən qüvvə F = 12 N-dur. F < F_{sür}^{max} olduğu üçün cisim hərəkət etmir. Sükunətdə olan cismə təsir edən sürtünmə qüvvəsi elə sükunət sürtünmə qüvvəsidir və təsir edən xarici qüvvəyə bərabərdir:\nF_{sürt} = F_{təsir} = 12 N."
  },
  {
    id: "p7",
    subject: "Fizika",
    difficulty: "medium",
    grades: [7, 8, 9, 10, 11],
    question: "Qabın dibinə göstərilən hidrostatik təzyiqi 3 dəfə artırmaq üçün qabdakı mayenin hündürlüyünü necə dəyişmək lazımdır?",
    options: ["3 dəfə artırmaq", "9 dəfə artırmaq", "3 dəfə azaltmaq", "Dəyişməmək"],
    answer: "3 dəfə artırmaq",
    concept: "Qabın dibinə düşən hidrostatik təzyiq düsturu yazın: p = \\rho g h. Təzyiqin hündürlükdən (h) düz və ya tərs mütənasib asılı olduğunu müəyyən edin.",
    explanation: "Hidrostatik təzyiq p = \\rho g h düsturu ilə hesablanır. Sıxlıq (\\rho) sabit qaldığından təzyiq maye sütununun hündürlüyündən (h) düz mütənasib asılıdır. Təzyiqi 3 dəfə artırmaq üçün hündürlüyü 3 dəfə artırmaq lazımdır."
  },
  {
    id: "p8",
    subject: "Fizika",
    difficulty: "hard",
    grades: [10, 11],
    question: "Fotonun çıxış işi A_çıx = 4 \\cdot 10^{-19} C-dur. Metalın üzərinə enerjisi E_f = 6 \\cdot 10^{-19} C olan foton düşərsə, fotoelektronların maksimum kinetik enerjisini tapın.",
    options: ["2 · 10^{-19} C", "10 · 10^{-19} C", "1.5 · 10^{-19} C", "0.5 · 10^{-19} C"],
    answer: "2 · 10^{-19} C",
    concept: "İşıq və fotoeffekt üçün Eynşteyn düsturunu tətbiq edin: E_f = A_{çıx} + E_k. Fotonun enerjisindən çıxış işini çıxaraq kinetik enerjini (E_k) tapın.",
    explanation: "Fotoeffekt üçün Eynşteyn düsturu: E_f = A_{çıx} + E_k.\nBuradan kinetik enerji: E_k = E_f - A_{çıx} = 6 \\cdot 10^{-19} C - 4 \\cdot 10^{-19} C = 2 \\cdot 10^{-19} C."
  },

  // ==================== AZƏRBAYCAN DİLİ (6 sual) ====================
  {
    id: "a1",
    subject: "Azərbaycan dili",
    difficulty: "medium",
    grades: [7, 8, 9, 10, 11],
    question: "\"Kitab oxumaq insanın dünyagörüşünü genişləndirir\" cümləsinin sintaktik təhlil sxemini müəyyən edin.",
    options: ["Mübtəda, Təyin, Tamamlıq, Xəbər", "Mübtəda, Tamamlıq, Xəbər", "Zərflik, Mübtəda, Xəbər", "Mübtəda, Xəbər"],
    answer: "Mübtəda, Tamamlıq, Xəbər",
    concept: "Cümlədəki əsas hərəkəti (genişləndirir - Xəbər) tapın. Hərəkəti icra edən predmeti (mübtədanı) və təsir göstərilən obyekti (tamamlığı) müvafiq suallarla müəyyənləşdirin. Məsdər tərkibinin bütöv bir cümlə üzvü olduğuna diqqət edin.",
    explanation: "1) Genişləndirir (Xəbər) - Nə edir?\n2) Kitab oxumaq (Mübtəda) - Nə? (Məsdər tərkibi ilə ifadə olunub)\n3) İnsanın dünyagörüşünü (Tamamlıq) - Nəyi? (III növ təyini söz birləşməsi ilə ifadə olunub)\nBeləliklə sxem: Mübtəda, Tamamlıq, Xəbər."
  },
  {
    id: "a2",
    subject: "Azərbaycan dili",
    difficulty: "medium",
    grades: [4, 5, 6, 7, 8, 9, 10, 11],
    question: "Hansı söz həm isim, həm də feil kimi işlənə bilən omonimdir?",
    options: ["Qala", "Divar", "Dəmir", "Qapı"],
    answer: "Qala",
    concept: "Omonimlər yazılışı və tələffüzü eyni olan, lakin leksik mənaları tamamilə fərqli olan sözlərdir. Seçilən sözün həm isim (ad bildirən), həm də feil (hərəkət bildirən) ola bildiyini yoxlayın.",
    explanation: "\"Qala\" sözü isim kimi tikili, qəsr mənasını verir (məs. Şuşa qalası).\nFeil kimi isə qalamaq feilinin əmr formasıdır (məs. ocaq qala)."
  },
  {
    id: "a3",
    subject: "Azərbaycan dili",
    difficulty: "hard",
    grades: [8, 9, 10, 11],
    question: "\"Oxumaq\" sözünün qrammatik məna növü və morfoloji kateqoriyası ilə bağlı düzgün fikri seçin:",
    options: [
      "Məlum növdədir, təsirli feildir.",
      "Məchul növdədir, təsirli feildir.",
      "Məlum növdədir, təsirsiz feildir.",
      "Şəxssiz növdədir, təsirsiz feildir."
    ],
    answer: "Məlum növdədir, təsirli feildir.",
    concept: "Feilin qrammatik məna növlərinin şəkilçilərini xatırlayın (-ıl, -ın, -ış, -dır). Əgər bu şəkilçilər yoxdursa, hansı növdür? Həmçinin, feildən əvvəl 'nəyi?' sualını verə bilirsinizsə, bu təsirli və ya təsirsiz feildir?",
    explanation: "\"Oxumaq\" feili heç bir xüsusi qrammatik məna növü şəkilçisi (-ıl, -ın, -ış, -dır) qəbul etmədiyi üçün məlum növdədir.\nHəmçinin \"nəyi?\" (məsələn, kitabı oxumaq) sualına cavab verdiyi üçün təsirli feildir."
  },
  {
    id: "a4",
    subject: "Azərbaycan dili",
    difficulty: "medium",
    grades: [3, 4, 5, 6, 7, 8, 9, 10, 11],
    question: "Hansı sözdə cingiltili samitin kar qarşılığı tələffüz olunur?",
    options: ["Səhər", "Polad", "Dəftər", "Bulud"],
    answer: "Polad",
    concept: "Sonu b, d, g, c cingiltili samitləri ilə bitən sözlərin tələffüz qaydasını yadınıza salın. Həmin samitlərdən sonra saitlə başlayan şəkilçi gəlmədikdə son samit kar tələffüz olunur.",
    explanation: "\"Polad\" sözünün sonu \"d\" samiti ilə bitir. Qaydaya görə, sonu b, d, g, c samitləri ilə bitən sözlərin sonundakı samit tələffüzdə kar qarşılığı ilə əvəz olunur (əgər saitlə başlayan şəkilçi və ya söz gəlmirsə). Polad [polat] gibi tələffüz edilir."
  },
  {
    id: "a5",
    subject: "Azərbaycan dili",
    difficulty: "hard",
    grades: [8, 9, 10, 11],
    question: "Aşağıdakı sözlərdən hansı neologizm (yeni söz) hesab olunur?",
    options: ["Dəbilqə", "Planşet", "Sayt", "Çörəkçi"],
    answer: "Sayt",
    concept: "Neologizmlər dilimizə yaxın dövrlərdə texnoloji və elmi-mədəni inkişafla bağlı olaraq gəlmiş tamamilə yeni sözlərdir. Variantlardakı ən müasir texnoloji sözü tapın.",
    explanation: "Neologizmlər dilimizə yeni daxil olmuş sözlərdir. Texnologiyanın inkişafı ilə dilimizə gələn \"Sayt\" neologizmdir."
  },
  {
    id: "a6",
    subject: "Azərbaycan dili",
    difficulty: "hard",
    grades: [7, 8, 9, 10, 11],
    question: "Hansı cümlədə frazeoloji birləşmə işlənmişdir?",
    options: [
      "O, acığından barmağını dişləyirdi.",
      "Müəllim lövhədə gözəl şəkil çəkdi.",
      "İdmançı qaçaraq birinci yerə çıxdı.",
      "Uşaqlar bağçada alma yeyirdilər."
    ],
    answer: "O, acığından barmağını dişləyirdi.",
    concept: "Frazeoloji birləşmələr məcazi mənada işlənən sabit söz birləşmələdir. Sözlərdən biri və ya hər ikisi öz həqiqi mənasından uzaqlaşaraq bütöv bir yeni məna yaradır.",
    explanation: "\"Barmağını dişləmək\" frazeoloji birləşmədir (məcazi mənada peşman olmaq/təəccüblənmək mənasını daşıyır)."
  },

  // ==================== İNGİLİS DİLİ (6 sual) ====================
  {
    id: "e1",
    subject: "İngilis dili",
    difficulty: "medium",
    grades: [7, 8, 9, 10, 11],
    question: "Choose the correct variant to complete the sentence:\n\"If she _______ the instructions carefully, she _______ that mistake yesterday.\"",
    options: [
      "read / wouldn't make",
      "had read / wouldn't have made",
      "reads / won't make",
      "has read / didn't make"
    ],
    answer: "had read / wouldn't have made",
    concept: "Bu cümlə keçmişdə baş vermiş real olmayan hərəkəti ifadə edir (Third Conditional). Struktur qaydasını xatırlayın: If + Past Perfect, would/could/might + have + Past Participle.",
    explanation: "This sentence is a Third Conditional (unreal past condition). The structure requires:\nIf + Past Perfect (had read), would/could/might + have + Past Participle (wouldn't have made)."
  },
  {
    id: "e2",
    subject: "İngilis dili",
    difficulty: "medium",
    grades: [4, 5, 6, 7, 8, 9, 10, 11],
    question: "Choose the correct prepositions:\n\"We arrived ______ Baku ______ a rainy autumn morning.\"",
    options: ["in / in", "at / on", "in / on", "to / at"],
    answer: "in / on",
    concept: "Konkret şəhər adları qarşısında gələn arrive feili üçün 'in' sözönü, müəyyən bir günün səhəri üçün isə 'on' sözönünü seçin.",
    explanation: "We use 'arrive in' for countries and big cities (Baku). For specific mornings or dates, we use 'on' (on a rainy autumn morning)."
  },
  {
    id: "e3",
    subject: "İngilis dili",
    difficulty: "medium",
    grades: [5, 6, 7, 8, 9, 10, 11],
    question: "Choose the correct modal verb:\n\"You ______ park here; it is a restricted zone and you will get a fine.\"",
    options: ["must", "needn't", "don't have to", "mustn't"],
    answer: "mustn't",
    concept: "Cümlədə qadağa (prohibition) mənası var ('restricted zone' - qadağan olunmuş zona və 'fine' - cərimə). Qadağan olunmuş hərəkətlər üçün hansı modal feil işlədilir?",
    explanation: "'Mustn't' indicates prohibition (qadağa). Since it is a restricted zone and you will get a fine, parking here is strictly prohibited."
  },
  {
    id: "e4",
    subject: "İngilis dili",
    difficulty: "hard",
    grades: [9, 10, 11],
    question: "Change the sentence into Passive Voice:\n\"They built a new school in our village last year.\"",
    options: [
      "A new school was built in our village last year.",
      "A new school is built in our village last year.",
      "A new school had been built in our village last year.",
      "A new school was building in our village last year."
    ],
    answer: "A new school was built in our village last year.",
    concept: "Cümlə Past Simple (Keçmiş sadə zaman) active formadadır. Məchul növə (Passive Voice) keçirərkən: Yeni Mübtəda + was/were + V3 (Past Participle) düsturundan istifadə edin.",
    explanation: "The active sentence is in the Past Simple. To convert it into passive:\nSubject (A new school) + was/were + V3 (built) + adverbial of place/time."
  },
  {
    id: "e5",
    subject: "İngilis dili",
    difficulty: "hard",
    grades: [3, 4, 5, 6, 7, 8, 9, 10, 11],
    question: "Choose the correct pronoun:\n\"I invited my friends, but none of _______ could come to _______ party.\"",
    options: ["their / mine", "them / my", "us / their", "they / me"],
    answer: "them / my",
    concept: "'None of' birləşməsindən sonra mütləq obyekt əvəzliyi (object pronoun) gəlməlidir. Cümlənin ikinci hissəsində isə isimdən ('party') əvvəl yiyəlik əvəzliyi gəlməlidir.",
    explanation: "'none of' is followed by an object pronoun (them). In the second part, we need a possessive determiner before the noun 'party' (my party)."
  },
  {
    id: "e6",
    subject: "İngilis dili",
    difficulty: "hard",
    grades: [8, 9, 10, 11],
    question: "Choose the correct relative pronoun:\n\"The doctor _______ saved the patient's life was awarded a medal.\"",
    options: ["which", "whose", "whom", "who"],
    answer: "who",
    concept: "Canlı ismi (The doctor) təyin etmək üçün nisbi əvəzliklərdən hansı istifadə olunmalıdır? Xüsusilə həmin əvəzlik budaq cümlədə mübtəda yerində çıxış edir.",
    explanation: "We use 'who' to describe a person (the doctor) when the pronoun serves as the subject of the relative clause."
  },

  // ==================== İNFORMATİKA (4 sual) ====================
  {
    id: "i1",
    subject: "İnformatika",
    difficulty: "medium",
    grades: [8, 9, 10, 11],
    question: "Python dilində yazılmış proqram fraqmentinin icrasından sonra ekrana nə çıxarılacaq?\n```python\ns = 0\nfor i in range(1, 10):\n    if i % 3 == 0:\n         s += i\n    elif i % 2 == 0:\n         s += 1\nprint(s)\n```",
    options: ["18", "21", "25", "15"],
    answer: "21",
    concept: "range(1, 10) funksiyası dövrdə i dəyişəninə 1-dən 9-a qədər qiymətlər verir. Hər i qiyməti üçün if və ya elif şərtlərini yoxlayın və s dəyişəninin köhnə qiymətinin üzərinə müvafiq ədədləri gəlin.",
    explanation: "range(1, 10) -> [1, 2, 3, 4, 5, 6, 7, 8, 9] qiymətlərini alır:\ni=2 -> s += 1 (s=1)\ni=3 -> s += 3 (s=4)\ni=4 -> s += 1 (s=5)\ni=6 -> s += 6 (s=11)\ni=8 -> s += 1 (s=12)\ni=9 -> s += 9 (s=21)\nDigər i qiymətlərində şərtlər ödənmir. Nəticə 21-dir."
  },
  {
    id: "i2",
    subject: "İnformatika",
    difficulty: "medium",
    grades: [7, 8, 9, 10, 11],
    question: "İkilik say sistemində verilmiş 101101_2 ədədini onluq say sisteminə çevirin.",
    options: ["45", "43", "53", "37"],
    answer: "45",
    concept: "İkilik ədədi onluq say sisteminə keçirmək üçün sağdan sola doğru rəqəmlərin üstünə sıfırdan başlayaraq sıra nömrələri yazın və hər bir rəqəmi 2-nin müvafiq qüvvətlərinə (2^0, 2^1, 2^2...) vuraraq toplayın.",
    explanation: "101101_2 = 1 \\cdot 2^5 + 0 \\cdot 2^4 + 1 \\cdot 2^3 + 1 \\cdot 2^2 + 0 \\cdot 2^1 + 1 \\cdot 2^0\n= 32 + 0 + 8 + 4 + 0 + 1 = 45."
  },
  {
    id: "i3",
    subject: "İnformatika",
    difficulty: "hard",
    grades: [8, 9, 10, 11],
    question: "4 Kbayt neçə bitə bərabərdir?",
    options: ["32768", "4096", "8192", "16384"],
    answer: "32768",
    concept: "İnformasiya ölçü vahidləri arasındakı keçid qaydalarını yadınıza salın: 1 Kbayt = 1024 Bayt, 1 Bayt = 8 bit. 4 Kbaytı əvvəlcə bayta, sonra isə bitə çevirmək üçün ardıcıl vurun.",
    explanation: "Həcm vahidlərinin çevrilməsi:\n1 Kbayt = 1024 Bayt\n1 Bayt = 8 bit\n4 Kbayt = 4 \\cdot 1024 Bayt = 4096 Bayt\n4096 Bayt = 4096 \\cdot 8 = 32768 bit."
  },
  {
    id: "i4",
    subject: "İnformatika",
    difficulty: "hard",
    grades: [8, 9, 10, 11],
    question: "Qovluqda hər birinin həcmi 256 Kbayt olan 16 şəkil faylı var. Bu qovluğun ümumi həcmi neçə Mbaytdır?",
    options: ["4 Mbayt", "2 Mbayt", "8 Mbayt", "1 Mbayt"],
    answer: "4 Mbayt",
    concept: "Şəkil fayllarının sayını bir şəklin həcminə vurun və Kbayt-la alınan nəticəni Mbayt-a çevirmək üçün 1024-ə bölün.",
    explanation: "16 şəkil \\cdot 256 Kbayt = 4096 Kbayt.\n1 Mbayt = 1024 Kbayt olduğunu nəzərə alsaq:\n4096 / 1024 = 4 Mbayt."
  },

  // ==================== MƏNTİQ (4 sual) ====================
  {
    id: "l1",
    subject: "Məntiq",
    difficulty: "medium",
    grades: [3, 4, 5, 6, 7, 8, 9, 10, 11],
    question: "Qanunauyğunluğu müəyyən edin və sual işarəsinin yerinə uyğun gələn ədədi tapın:\n3, 5, 9, 17, 33, ?",
    options: ["49", "65", "67", "72"],
    answer: "65",
    concept: "Ardıcıl ədədlər arasındakı artım fərqlərini yazın: 3-dən 5-ə (+2), 5-dən 9-a (+4) və s. Fərqlərin hansı həndəsi silsilə (2-nin qüvvətləri) qanununa uyğun getdiyini müəyyən edin.",
    explanation: "Ədələrin artım ardıcıllığına baxaq:\n3 -> (+2) -> 5 -> (+4) -> 9 -> (+8) -> 17 -> (+16) -> 33.\nArtımlar 2-nin qüvvətləridir (2, 4, 8, 16). Növbəti artım 32 olmalıdır:\n33 + 32 = 65."
  },
  {
    id: "l2",
    subject: "Məntiq",
    difficulty: "hard",
    grades: [5, 6, 7, 8, 9, 10, 11],
    question: "Qanunauyğunluğu müəyyən edin və sual işarəsinin yerinə uyğun gələn ədədi tapın:\nƏgər [4 Δ 3] = 25, [5 Δ 2] = 29, [6 Δ 1] = 37 olarsa, [7 Δ 2] = ?",
    options: ["53", "49", "57", "61"],
    answer: "53",
    concept: "Məntiqi operatorlarda verilmiş ədədlərin kvadratları cəmini yoxlayın: [a Δ b] = a^2 + b^2. Qaydanın bütün nümunələrdə ödədiyini təsdiqləyin və tətbiq edin.",
    explanation: "Məntiqi operatorun qaydası: [a Δ b] = a^2 + b^2 dir.\n4^2 + 3^2 = 16 + 9 = 25\n5^2 + 2^2 = 25 + 4 = 29\n6^2 + 1^2 = 36 + 1 = 37\n7^2 + 2^2 = 49 + 4 = 53."
  },
  {
    id: "l3",
    subject: "Məntiq",
    difficulty: "medium",
    grades: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    question: "Söz cütləri arasındakı məntiqi əlaqəyə əsasən sual işarəsinin yerinə uyğun gələn sözü seçin:\nKitab : Kitabxana = Eksponat : ?",
    options: ["Muzey", "Sərgi", "Qalereya", "Arxiv"],
    answer: "Muzey",
    concept: "Verilmiş birinci cütdəki sözlər arasındakı məntiqi asılılığa baxın: obyekt və onun rəsmi qorunduğu/saxlanıldığı yer. Analoji əlaqəni ikinci cüt üçün qurun.",
    explanation: "Kitab kitabxanada saxlanılır və qorunur (oraya məxsusdur). Analoji olaraq, eksponat muzeydə saxlanılır, qorunur və sərgilənir."
  },
  {
    id: "l4",
    subject: "Məntiq",
    difficulty: "hard",
    grades: [4, 5, 6, 7, 8, 9, 10, 11],
    question: "Qanunauyğunluğu müəyyən edin və buraxılmış ədədi tapın:\n(2 -> 8), (3 -> 27), (4 -> 64), (5 -> ?)",
    options: ["125", "100", "150", "250"],
    answer: "125",
    concept: "Hər bir ədəd özünün kubuna (x^3) uyğunlaşdırılmışdır:\n2^3 = 8\n3^3 = 27\n4^3 = 64\n5^3 = 125.",
    explanation: "Hər bir ədəd özünün kubuna (x^3) uyğunlaşdırılmışdır:\n2^3 = 8\n3^3 = 27\n4^3 = 64\n5^3 = 125."
  }
];

// E-modul formatında digər fayllarda istifadə üçün
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { questionsDatabase };
}
