// =====================================================================
//  EDITABLE CONTENT FOR MIRCHI'S WORLD
//  Replace any text below with your own words. Everything on the site
//  reads from this file, so you never need to touch the page layouts.
// =====================================================================

export const siteName = "For Mirchi";
export const footerLine = "A little world for Mirchi.";

// Page titles and meta descriptions (shown in the browser tab)
export const pageMeta = {
  "/": {
    title: "A Little World for Mirchi",
    description: "A dreamy little world made just for Mirchi.",
  },
  "/about": {
    title: "What Makes You Special | For Mirchi",
    description: "A page celebrating the things that make Mirchi special.",
  },
  "/garden": {
    title: "Flowers for Mirchi | For Mirchi",
    description: "A virtual garden of white and plum flowers, made for Mirchi.",
  },
  "/notes": {
    title: "A Few Words for You | For Mirchi",
    description: "Little love notes, one envelope at a time.",
  },
  "/memories": {
    title: "Little Moments, Beautiful Feelings | For Mirchi",
    description: "A memory gallery and timeline for Mirchi.",
  },
  "/starry-sky": {
    title: "A Sky Full of Stars | For Mirchi",
    description: "Tap the stars to reveal a hidden message.",
  },
  "/music": {
    title: "A Soundtrack for Your Little World | For Mirchi",
    description: "A music corner for Mirchi's little world.",
  },
  "/final-surprise": {
    title: "One Last Little Thing | For Mirchi",
    description: "A final surprise for Mirchi.",
  },
};

export const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Mirchi" },
  { to: "/garden", label: "Flower Garden" },
  { to: "/notes", label: "Love Notes" },
  { to: "/memories", label: "Memories" },
  { to: "/starry-sky", label: "Starry Sky" },
  { to: "/music", label: "Music & Mood" },
  { to: "/final-surprise", label: "Final Surprise" },
];

// ---------- PAGE 2: About Mirchi (editable placeholder messages) ----------
export const aboutHeading = "There Is Something Special About You.";
export const aboutLead =
  "A few words to celebrate the things that make you, you. Replace these with your own personal messages.";

export const appreciation = [
  {
    id: "a1",
    title: "Your Beautiful Energy",
    text: "Some people bring a calm, bright feeling wherever they go. Describe that feeling here in your own words.",
  },
  {
    id: "a2",
    title: "Your Uniqueness",
    text: "There is nobody else quite like you. Write one thing you truly admire about her here.",
  },
  {
    id: "a3",
    title: "Your Little Magic",
    text: "Often the small things leave the biggest impression. Add one of those little moments here.",
  },
  {
    id: "a4",
    title: "Simply You",
    text: "You do not have to be anything other than yourself to be wonderful. Add your closing thought here.",
  },
];

export const aboutClosing = "Thank you for being exactly who you are.";

// ---------- PAGE 3: Flower Garden ----------
// x / y are percentages of the garden field. scale changes flower size.
export const gardenFlowers = [
  { id: "f1", x: 10, y: 20, scale: 0.8, variant: "white", message: "You are allowed to bloom at your own pace." },
  { id: "f2", x: 84, y: 16, scale: 0.9, variant: "plum", message: "Like a white flower under moonlight, a calm heart is beautiful." },
  { id: "f3", x: 20, y: 58, scale: 1.0, variant: "plum", message: "May this flower carry a small wish of happiness for you." },
  { id: "f4", x: 78, y: 54, scale: 0.85, variant: "white", message: "Plum blossoms remind us that gentle things can be strong." },
  { id: "f5", x: 6, y: 80, scale: 0.7, variant: "white", message: "Some beautiful things are worth waiting for. So are you." },
  { id: "f6", x: 50, y: 84, scale: 0.9, variant: "plum", message: "Let this little garden remind you to take a breath today." },
  { id: "f7", x: 92, y: 84, scale: 0.75, variant: "white", message: "Soft petals, quiet evenings, and kind thoughts for you." },
  { id: "f8", x: 34, y: 30, scale: 0.6, variant: "white", message: "Tiny things can make a day feel a little brighter." },
  { id: "f9", x: 66, y: 32, scale: 0.65, variant: "plum", message: "Wishing your days are gentle and your nights are peaceful." },
  { id: "f-secret", x: 92, y: 42, scale: 0.5, variant: "plum", secret: true, message: "" },
];

export const secretMessage =
  "You found the secret flower. Keep noticing the little things that make you smile. 💙";

// ---------- PAGE 4: Love Notes ----------
export const loveNotes = [
  { id: "n1", text: "You deserve all the beautiful little things life has to offer." },
  { id: "n2", text: "Some people bring a little extra light into the world." },
  { id: "n3", text: "This little corner of the internet was made especially for you." },
  { id: "n4", text: "May your days always hold a reason to smile." },
  { id: "n5", text: "May your evenings be as peaceful as a blue sky after rain." },
  { id: "n6", text: "Take a moment today to notice something beautiful. You deserve it." },
  { id: "n7", text: "Wishing you calm days, kind people, and quiet happiness." },
  { id: "n8", text: "Whatever you are carrying today, I hope it feels a little lighter." },
];

// ---------- PAGE 5: Memory Garden ----------
// kind: sky | moon | flowers | lake | petals | stars
// src: optional path to a real photo (e.g. "/photos/1.jpg"). Leave "" to use the artwork.
export const memories = [
  { id: "m1", kind: "sky", caption: "Moonlit Sky", date: "Add a date", src: "" },
  { id: "m2", kind: "flowers", caption: "White Blossoms", date: "Add a date", src: "" },
  { id: "m3", kind: "lake", caption: "Quiet Blue Lake", date: "Add a date", src: "" },
  { id: "m4", kind: "petals", caption: "Plum Petals", date: "Add a date", src: "" },
  { id: "m5", kind: "stars", caption: "Starry Night", date: "Add a date", src: "" },
  { id: "m6", kind: "moon", caption: "Midnight Moon", date: "Add a date", src: "" },
];

export const timeline = [
  { id: "t1", date: "Add a date", title: "Add a title", text: "Write a special moment you want to remember here." },
  { id: "t2", date: "Add a date", title: "Add a title", text: "Another little memory can go here." },
  { id: "t3", date: "Add a date", title: "Add a title", text: "Add as many moments as you like." },
];

// ---------- PAGE 6: Starry Sky ----------
export const starMessages = [
  "Every star here is a tiny wish for you.",
  "May your nights be calm and your mornings bright.",
  "Hope your heart always finds a little light.",
  "The sky feels a little softer with you in it.",
  "Sweet dreams, Mirchi.",
  "Look up sometimes. The sky has a gift for you.",
];

export const wishMessage =
  "Your wish has been sent to the stars. May the sky keep it safe for you. 💙";

// ---------- PAGE 7: Music ----------
// Put audio files in /public/audio/ and set the src. Missing files are handled gracefully.
export const playlist = [
  { id: "s1", title: "Your first song", artist: "Add an artist", src: "/audio/song-1.mp3" },
  { id: "s2", title: "Track two", artist: "Add an artist", src: "/audio/song-2.mp3" },
  { id: "s3", title: "Track three", artist: "Add an artist", src: "/audio/song-3.mp3" },
];

// ---------- PAGE 8: Final Surprise ----------
export const finalIntro = "Mirchi, before you leave…";
export const finalMessage =
  "Mirchi, this little world was created especially for you. I wanted to make something beautiful using the colors and flowers you love. I hope it brings a smile to your face and reminds you that you deserve beautiful moments, happiness, and kindness. May your world always have a little magic in it. 💙🤍";
export const finalSignature = "Made with care, just for Mirchi.";
