// ---------- Sample data ----------
const STORIES = [
  { name: 'your story', avatar: 'https://i.pravatar.cc/120?img=12', self: true },
  { name: 'lena.codes', avatar: 'https://i.pravatar.cc/120?img=47' },
  { name: 'm.aurelius', avatar: 'https://i.pravatar.cc/120?img=15' },
  { name: 'travel.diary', avatar: 'https://i.pravatar.cc/120?img=32' },
  { name: 'kai.runs', avatar: 'https://i.pravatar.cc/120?img=11' },
  { name: 'sora.eats', avatar: 'https://i.pravatar.cc/120?img=49', viewed: true },
  { name: 'noah.builds', avatar: 'https://i.pravatar.cc/120?img=8' },
  { name: 'ivy.films', avatar: 'https://i.pravatar.cc/120?img=24' },
  { name: 'rio.studio', avatar: 'https://i.pravatar.cc/120?img=33', viewed: true },
  { name: 'park.daily', avatar: 'https://i.pravatar.cc/120?img=5' },
  { name: 'mira.art', avatar: 'https://i.pravatar.cc/120?img=44' },
];

const POSTS = [
  {
    user: 'lena.codes',
    avatar: 'https://i.pravatar.cc/120?img=47',
    verified: true,
    time: '2h',
    timeFull: '2 hours ago',
    image: 'https://picsum.photos/id/1015/900/900',
    likes: 1248,
    caption: 'morning light over the river. shot on the way to work today.',
    comments: 32,
    topComment: { user: 'kai.runs', text: 'unreal colors here' },
  },
  {
    user: 'travel.diary',
    avatar: 'https://i.pravatar.cc/120?img=32',
    verified: false,
    time: '5h',
    timeFull: '5 hours ago',
    image: 'https://picsum.photos/id/1043/900/900',
    likes: 8412,
    caption: 'three days into the trail. the mountains keep getting bigger 🏔️',
    comments: 214,
    topComment: { user: 'noah.builds', text: 'next adventure pls take me' },
  },
  {
    user: 'sora.eats',
    avatar: 'https://i.pravatar.cc/120?img=49',
    verified: true,
    time: '8h',
    timeFull: '8 hours ago',
    image: 'https://picsum.photos/id/292/900/900',
    likes: 532,
    caption: 'sunday brunch experiment — sourdough finally got the crumb 🥖',
    comments: 47,
    topComment: { user: 'mira.art', text: 'recipe drop when' },
  },
  {
    user: 'rio.studio',
    avatar: 'https://i.pravatar.cc/120?img=33',
    verified: false,
    time: '1d',
    timeFull: '1 day ago',
    image: 'https://picsum.photos/id/1025/900/900',
    likes: 2099,
    caption: 'meet biscuit. new addition to the studio. productivity is at an all time low.',
    comments: 88,
    topComment: { user: 'ivy.films', text: 'cutest coworker ever' },
  },
];

const SUGGESTIONS = [
  { user: 'design.daily', avatar: 'https://i.pravatar.cc/80?img=21', sub: 'Followed by lena.codes' },
  { user: 'pixel.lab', avatar: 'https://i.pravatar.cc/80?img=18', sub: 'Suggested for you' },
  { user: 'studio.404', avatar: 'https://i.pravatar.cc/80?img=27', sub: 'New to Instagram' },
  { user: 'micro.shots', avatar: 'https://i.pravatar.cc/80?img=39', sub: 'Followed by travel.diary' },
  { user: 'minimal.cuts', avatar: 'https://i.pravatar.cc/80?img=51', sub: 'Suggested for you' },
];

// ---------- Icons (svg path strings) ----------
const ICONS = {
  heart: '<svg viewBox="0 0 24 24"><path d="M12 21s-7-4.5-9-9.5A5 5 0 0 1 12 6a5 5 0 0 1 9 5.5C19 16.5 12 21 12 21z"/></svg>',
  comment: '<svg viewBox="0 0 24 24"><path d="M21 12a8 8 0 0 1-12.5 6.6L3 20l1.4-5.5A8 8 0 1 1 21 12z"/></svg>',
  share: '<svg viewBox="0 0 24 24"><path d="m22 2-7 20-4-9-9-4z"/><path d="M22 2 11 13"/></svg>',
  save: '<svg viewBox="0 0 24 24"><path d="M6 3h12v18l-6-4-6 4z"/></svg>',
  more: '<svg viewBox="0 0 24 24"><circle cx="5" cy="12" r="1.6" fill="currentColor"/><circle cx="12" cy="12" r="1.6" fill="currentColor"/><circle cx="19" cy="12" r="1.6" fill="currentColor"/></svg>',
  emoji: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M9 10h.01M15 10h.01M9 15c.8.8 1.9 1.3 3 1.3s2.2-.5 3-1.3"/></svg>',
  verified: '<svg viewBox="0 0 24 24" width="14" height="14" style="fill:currentColor;stroke:none"><path d="M12 2 14 4l3-.5L18 6l3 1-1 3 1 3-3 1-1 2.5L14 16l-2 2-2-2-3 .5L6 14l-3-1 1-3-1-3 3-1 1-2.5L10 4z"/><path d="m9 12 2 2 4-4" style="fill:none;stroke:#fff;stroke-width:2"/></svg>',
};

const formatNum = (n) => n >= 1000 ? `${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}k` : n.toLocaleString();

// ---------- Render stories ----------
function renderStories() {
  const track = document.getElementById('storiesTrack');
  track.innerHTML = STORIES.map((s) => `
    <button class="story ${s.viewed ? 'viewed' : ''}" type="button" aria-label="${s.name}'s story">
      <span class="story-ring">
        <span class="avatar" style="background-image:url('${s.avatar}')"></span>
      </span>
      <span class="story-name">${s.self ? 'Your story' : s.name}</span>
    </button>
  `).join('');
}

// ---------- Render feed ----------
function renderFeed() {
  const feed = document.getElementById('feed');
  feed.innerHTML = POSTS.map((p, i) => `
    <article class="post" data-index="${i}">
      <header class="post-head">
        <span class="avatar" aria-hidden="true">
          <span style="background-image:url('${p.avatar}')"></span>
        </span>
        <div class="post-meta">
          <span class="post-user">
            ${p.user}
            ${p.verified ? `<span class="verified" title="Verified">${ICONS.verified}</span>` : ''}
            <span style="color:var(--text-muted);font-weight:400">· ${p.time}</span>
          </span>
        </div>
        <button class="post-more" aria-label="More options">${ICONS.more}</button>
      </header>

      <div class="post-media" data-action="dblheart">
        <img src="${p.image}" alt="Post by ${p.user}" loading="lazy" />
        <div class="heart-burst">${ICONS.heart}</div>
      </div>

      <div class="post-actions">
        <button class="icon-btn like" aria-label="Like" data-action="like">${ICONS.heart}</button>
        <button class="icon-btn" aria-label="Comment">${ICONS.comment}</button>
        <button class="icon-btn" aria-label="Share">${ICONS.share}</button>
        <button class="icon-btn save" aria-label="Save" data-action="save">${ICONS.save}</button>
      </div>

      <div class="post-likes" data-likes="${p.likes}">${formatNum(p.likes)} likes</div>
      <div class="post-caption">
        <span class="user">${p.user}</span>${p.caption}
      </div>
      <div class="post-comments">
        <a href="#">View all ${p.comments} comments</a>
        <div style="margin-top:4px;color:var(--text)">
          <span style="font-weight:600;margin-right:6px">${p.topComment.user}</span>${p.topComment.text}
        </div>
      </div>
      <div class="post-time-foot" title="${p.timeFull}">${p.timeFull}</div>

      <form class="post-add" data-form="comment">
        <span class="ico" style="color:var(--text-muted)">${ICONS.emoji}</span>
        <input type="text" placeholder="Add a comment..." aria-label="Add a comment" />
        <button class="post-btn" type="submit">Post</button>
      </form>
    </article>
  `).join('');
}

// ---------- Render suggestions ----------
function renderSuggestions() {
  const list = document.getElementById('suggestions');
  list.innerHTML = SUGGESTIONS.map((s) => `
    <li class="sugg">
      <span class="avatar" style="background-image:url('${s.avatar}')"></span>
      <div class="sugg-text">
        <div class="sugg-name">${s.user}</div>
        <div class="sugg-sub">${s.sub}</div>
      </div>
      <button class="sugg-follow" type="button" data-action="follow">Follow</button>
    </li>
  `).join('');
}

// ---------- Interactions ----------
function attachEvents() {
  // Like / save / double-tap
  document.getElementById('feed').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;
    const action = btn.dataset.action;
    const post = btn.closest('.post');

    if (action === 'like') {
      toggleLike(post);
    } else if (action === 'save') {
      btn.classList.toggle('saved');
    } else if (action === 'dblheart') {
      // handled by dblclick listener below
    }
  });

  // Double-click image to like
  document.querySelectorAll('[data-action="dblheart"]').forEach((media) => {
    media.addEventListener('dblclick', () => {
      const post = media.closest('.post');
      const likeBtn = post.querySelector('.icon-btn.like');
      if (!likeBtn.classList.contains('liked')) toggleLike(post, true);
      const burst = media.querySelector('.heart-burst');
      burst.classList.remove('show');
      void burst.offsetWidth;
      burst.classList.add('show');
    });
  });

  // Comment input enable post button
  document.querySelectorAll('[data-form="comment"]').forEach((form) => {
    const input = form.querySelector('input');
    const btn = form.querySelector('.post-btn');
    input.addEventListener('input', () => {
      btn.classList.toggle('active', input.value.trim().length > 0);
    });
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!btn.classList.contains('active')) return;
      input.value = '';
      btn.classList.remove('active');
    });
  });

  // Follow toggle
  document.getElementById('suggestions').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-action="follow"]');
    if (!btn) return;
    const following = btn.classList.toggle('following');
    btn.textContent = following ? 'Following' : 'Follow';
  });

  // Story scroll buttons
  const track = document.getElementById('storiesTrack');
  document.querySelector('.story-scroll.left').addEventListener('click', () => {
    track.scrollBy({ left: -240, behavior: 'smooth' });
  });
  document.querySelector('.story-scroll.right').addEventListener('click', () => {
    track.scrollBy({ left: 240, behavior: 'smooth' });
  });
}

function toggleLike(post, forceLike = false) {
  const btn = post.querySelector('.icon-btn.like');
  const likesEl = post.querySelector('.post-likes');
  const current = parseInt(likesEl.dataset.likes, 10);
  const liked = btn.classList.contains('liked');
  if (forceLike && liked) return;
  btn.classList.toggle('liked', !liked);
  const next = liked ? current - 1 : current + 1;
  likesEl.dataset.likes = next;
  likesEl.textContent = `${formatNum(next)} likes`;
}

// ---------- Boot ----------
renderStories();
renderFeed();
renderSuggestions();
attachEvents();
