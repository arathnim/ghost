var marked = require('marked');
var fs = require('fs');
const matter = require('gray-matter');
const $ = require('cheerio');

// public/blog/name         -- {content, data}
// public/blog-meta.json    -- list of {path, title, date, preview} all raw, not html

function handlePost(s) {
  var m = matter(s);
  m.content = marked(m.content);
  return m;
}

console.log("Running build script");

// blog posts

var renderedPosts = fs.readdirSync('./public/blog/');
renderedPosts.forEach((path) => fs.unlinkSync('./public/blog/'+path));

var posts = fs.readdirSync('./posts/');
var content = posts.map(
  (path) => [path.slice(0, (path.length - 3)), handlePost(fs.readFileSync('./posts/' + path, 'utf8'))]
);

content.forEach(
  ([path, data]) => fs.writeFileSync('./public/blog/' + path, JSON.stringify(data))
);

console.log("Blog posts written");

var metadata = content.map(
  ([path, o]) =>
  ({
    "path": path,
    "title": o.data.title,
    "date": o.data.date,
    "preview": ($(o.content).first('p').html() + "</p><p>" + $(o.content).first('p').next().html()),
  })
);

fs.writeFileSync('./public/blog-meta.json', JSON.stringify(metadata));

console.log("Blog metadata written");

// projects

var renderedPosts2 = fs.readdirSync('./public/projects/');
renderedPosts2.forEach((path) => fs.unlinkSync('./public/projects/'+path));

var posts2 = fs.readdirSync('./projects/');
var content2 = posts2.map(
  (path) => [path.slice(0, (path.length - 3)), handlePost(fs.readFileSync('./projects/' + path, 'utf8'))]
);

content2.forEach(
  ([path, data]) => fs.writeFileSync('./public/projects/' + path, JSON.stringify(data))
);

console.log("Project posts written");

var metadata2 = content2.map(
  ([path, o]) =>
  ({
    "path": path,
    "title": o.data.title,
    "summary": o.data.summary,
  })
);

fs.writeFileSync('./public/project-meta.json', JSON.stringify(metadata2));

console.log("Project metadata written");

// resume

var resume = handlePost(fs.readFileSync('./resume.md', 'utf8'))
fs.writeFileSync('./public/resume.json', JSON.stringify(resume))

console.log("Resume markdown written");

// about

var about = handlePost(fs.readFileSync('./about.md', 'utf8'))
fs.writeFileSync('./public/about.json', JSON.stringify(about))

console.log("About metadata written");
