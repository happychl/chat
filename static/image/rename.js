const fs = require('fs');
const path = require('path');

const filepath = __dirname + '/avatar';
const files = fs.readdirSync(filepath);

const pics = files.filter(f => {
  return f.endsWith('.jpg');
});

for (let i = 0, len = pics.length; i < len; i++) {
    fs.rename(path.join(filepath, pics[i]), path.join(filepath, `avatar${i+1}.jpg`), err => {
      if (err) {
        throw err;
      }
      console.log('done!');
    });
}
