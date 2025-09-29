let quotes = [
    "I am fearfully and wonderfully made. - Psalm 139:14",
    "The Lord is my shepherd, I shall not want. - Psalm 23:1",
    "I can do all things through Christ who strengthens me. - Philippians 4:13",
    "For God has not given us a spirit of fear, but of power, love, and a sound mind. – 2 Timothy 1:7",
    "The joy of the Lord is my strength. - Nehemiah 8:10",
    "I know the plans I have for you, declares the Lord. - Jeremiah 29:11",
    "But the fruit of the Spirit is love, joy, peace, forbearance, kindness, goodness, faithfulness. - Galatians 5:22",
    "I am more than a conqueror through Him who loved me. - Romans 8:37",
    "I can do all things through Him who gives me strength. - Philippians 4:13",
    "Blessed are the pure in heart, for they will see God. - Matthew 5:8",
    "With God all things are possible. - Matthew 19:26",
    "I have come that they may have life, and have it to the full. - John 10:10",
    "The Lord will fight for you; you need only to be still. - Exodus 14:14",
    "The Lord is close to the brokenhearted and saves those who are crushed in spirit. - Psalm 34:18",
    "God is our refuge and strength, an ever-present help in trouble. - Psalm 46:1",
    "The Lord is my light and my salvation—whom shall I fear? - Psalm 27:1",
    "Cast all your anxiety on Him because He cares for you. - 1 Peter 5:7",
    "God has given me a spirit of power, love, and self-control. - 2 Timothy 1:7",
    "Be still, and know that I am God. - Psalm 46:10",
    "He who began a good work in you will carry it on to completion. - Philippians 1:6",
    "The Lord will give strength to His people; the Lord will bless His people with peace. - Psalm 29:11",
    "For I know the plans I have for you, declares the Lord, plans for welfare and not for evil, to give you a future and a hope. - Jeremiah 29:11",
    "Fear not, for I have redeemed you; I have called you by name, you are mine. - Isaiah 43:1",
    "I will never leave you nor forsake you. - Hebrews 13:5",
    "You are the light of the world. - Matthew 5:14",
    "The Lord is my strength and my shield; my heart trusts in Him, and He helps me. - Psalm 28:7",
    "Let everything that has breath praise the Lord. - Psalm 150:6",
    "The peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus. - Philippians 4:7",
    "No weapon forged against you will prevail. - Isaiah 54:17",
    "You are my refuge and my shield; I have put my hope in Your word. - Psalm 119:114",
    "The Lord is righteous in all His ways and faithful in all He does. - Psalm 145:17",
    "The Lord is gracious and compassionate, slow to anger and rich in love. - Psalm 145:8",
    "In the beginning, God created the heavens and the earth. - Genesis 1:1",
    "Be strong and courageous. Do not be afraid or terrified because of them, for the Lord your God goes with you; He will never leave you nor forsake you. - Deuteronomy 31:6",
    "I am the vine; you are the branches. - John 15:5"
];

let timer;
let timeLeft = 60;
let wpm = 0;
let totalTypedChars = 0;
let correctChars = 0;
let isTestRunning = false;
let currentQuote = "";
let quoteIndex = 0;

function startTest() {
    if (isTestRunning) return;
    isTestRunning = true;
    wpm = 0;
    timeLeft = 60;
    document.getElementById('time').textContent = timeLeft;
    totalTypedChars = 0;
    correctChars = 0;
    document.getElementById('typed-text').value = '';
    document.getElementById('typed-text').disabled = false;

    currentQuote = quotes[quoteIndex];
    document.getElementById('quote').textContent = currentQuote;

    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('time').textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            document.getElementById('typed-text').disabled = true;
            calculateWPM();
        }
    }, 1000);
}

function checkTyping() {
    let typedText = document.getElementById('typed-text').value;
    totalTypedChars = typedText.length;

    correctChars = 0;
    for (let i = 0; i < typedText.length; i++) {
        if (typedText[i] === currentQuote[i]) {
            correctChars++;
        }
    }

    calculateAccuracy();

    if (typedText === currentQuote) {
        quoteIndex = (quoteIndex + 1) % quotes.length;
        currentQuote = quotes[quoteIndex];
        document.getElementById('quote').textContent = currentQuote;
        document.getElementById('typed-text').value = '';
    }
}

function calculateWPM() {
    const timeInMinutes = 1;
    wpm = Math.round((totalTypedChars / 5) / timeInMinutes);
    document.getElementById('wpm').textContent = wpm;
}

function calculateAccuracy() {
    const accuracy = Math.round((correctChars / totalTypedChars) * 100);
    document.getElementById('accuracy').textContent = accuracy;
}

function resetTest() {
    clearInterval(timer);
    isTestRunning = false;
    document.getElementById('typed-text').disabled = true;
    document.getElementById('time').textContent = '60';
    document.getElementById('wpm').textContent = '0';
    document.getElementById('accuracy').textContent = '100';
    document.getElementById('quote').textContent = 'Click "Start" to begin the typing test.';
    document.getElementById('typed-text').value = '';
}
