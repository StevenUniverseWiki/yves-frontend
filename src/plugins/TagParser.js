import { escape } from 'html-escaper';

const ChatTags = {
    'b': function (s, t) {
        if (t.charAt(0) === '/') {
            s = s.replace('[/b]', '</span>');
        } else {
            s = s.replace('[b]', '<span style="font-weight:bold;">');
        }
        return s;
    },
    'bg': function (s, t) {
        if (t.charAt(0) === '/') {
            s = s.replace('[/bg]', '</span>');
        } else {
            try {
                t = t.split('="');
                t[1] = t[1].replace('"', '');
                s = s.replace('[bg="' + t[1] + '"]', '<span style="background-color:' + escape(t[1]) + ';">');
            } catch (e) {
                console.log(e);
            }
        }
        return s;
    },
    'big': function (s, t) {
        if (t.charAt(0) === '/') {
            s = s.replace('[/big]', '</span>');
        } else {
            s = s.replace('[big]', '<span style="font-size:16pt;">');
        }
        return s;
    },
    'c': function (s, t) {
        if (t.charAt(0) === '/') {
            s = s.replace('[/c]', '</span>');
        } else {
            try {
                t = t.split('="');
                t[1] = t[1].replace('"', '');
                s = s.replace('[c="' + t[1] + '"]', '<span style="color:' + escape(t[1]) + ';">');
            } catch (e) {
                console.log(e);
            }
        }
        return s;
    },
    'code': function (s, t) {
        if (t.charAt(0) === '/') {
            s = s.replace('[/code]', '</span>');
        } else {
            s = s.replace('[code]', '<span style="font-family:monospace;">');
        }
        return s;
    },
    'font': function (s, t) {
        if (t.charAt(0) === '/') {
            s = s.replace('[/font]', '</span>');
        } else {
            try {
                t = t.split('="');
                t[1] = t[1].replace('"', '');
                s = s.replace('[font="' + t[1] + '"]', '<span style="font-family:' + escape(t[1]) + ';">');
            } catch (e) {
                console.log(e);
            }
        }
        return s;
    },
    'i': function (s, t) {
        if (t.charAt(0) === '/') {
            s = s.replace('[/i]', '</span>');
        } else {
            s = s.replace('[i]', '<span style="font-style:italic;">');
        }
        return s;
    },
    'small': function (s, t) {
        if (t.charAt(0) === '/') {
            s = s.replace('[/small]', '</span>');
        } else {
            s = s.replace('[small]', '<span style="font-size:7pt;">');
        }
        return s;
    },
    's': function (s, t) {
        if (t.charAt(0) === '/') {
            s = s.replace('[/s]', '</span>');
        } else {
            s = s.replace('[s]', '<span style="text-decoration:line-through;">');
        }
        return s;
    },
    'sub': function (s, t) {
        if (t.charAt(0) === '/') {
            s = s.replace('[/sub]', '</sub>');
        } else {
            s = s.replace('[sub]', '<sub>');
        }
        return s;
    },
    'sup': function (s, t) {
        if (t.charAt(0) === '/') {
            s = s.replace('[/sup]', '</sup>');
        } else {
            s = s.replace('[sup]', '<sup>');
        }
        return s;
    },
    'u': function (s, t) {
        if (t.charAt(0) === '/') {
            s = s.replace('[/u]', '</span>');
        } else {
            s = s.replace('[u]', '<span style="text-decoration:underline;">');
        }
        return s;
    },
    'audio': function (s, t) {
        if (t.charAt(0) !== '/') {
            try {
                t = t.split('="');
                t[1] = t[1].replace('"', '');
                s = s.replace('[audio="' + t[1] + '"]', '<audio class="chat-audio" controls preload="none"><source src="https://' + escape(t[1]) + '"></audio>');
            } catch (e) {
                console.log(e);
            }
        }
        return s;
    },
    'audio-a': function (s, t) {
        if (t.charAt(0) !== '/') {
            try {
                t = t.split('="');
                t[1] = t[1].replace('"', '');
                s = s.replace('[audio-a="' + t[1] + '"]', '<audio autoplay><source src="https://' + escape(t[1]) + '"></audio>');
            } catch (e) {
                console.log(e);
            }
        }
        return s;
    },
    'audio-ca': function (s, t) {
        if (t.charAt(0) !== '/') {
            try {
                t = t.split('="');
                t[1] = t[1].replace('"', '');
                s = s.replace('[audio-ca="' + t[1] + '"]', '<audio class="chat-audio" controls autoplay><source src="https://' + escape(t[1]) + '"></audio>');
            } catch (e) {
                console.log(e);
            }
        }
        return s;
    },
    'vocaroo': function (s, t) {
        if (t.charAt(0) !== '/') {
            try {
                t = t.split('="');
                t[1] = t[1].replace('"', '');
                s = s.replace('[vocaroo="' + t[1] + '"]', '<audio class="chat-audio" controls preload="none"><source src="https://vocaroo.com/media_command.php?media=' + escape(t[1]) + '&command=download_ogg" type="audio/ogg"><source src="https://vocaroo.com/media_command.php?media=' + escape(t[1]) + '&command=download_mp3" type="audio/mpeg"></audio>');
            } catch (e) {
                console.log(e);
            }
        }
        return s;
    },
    'soundcloud': function (s, t) {
        if (t.charAt(0) !== '/') {
            try {
                t = t.split('="');
                t[1] = t[1].replace('"', '');
                s = s.replace('[soundcloud="' + t[1] + '"]', '<iframe class="chat-soundcloud" height="166" src="//w.soundcloud.com/player/?url=/' + escape(t[1]) + '&show_artwork=false" frameborder="0"></iframe>');
            } catch (e) {
                console.log(e);
            }
        }
        return s;
    },
    'soundcloud-playlist': function (s, t) {
        if (t.charAt(0) !== '/') {
            try {
                t = t.split('="');
                t[1] = t[1].replace('"', '');
                s = s.replace('[soundcloud-playlist="' + t[1] + '"]', '<iframe class="chat-soundcloud-pl" height="465" src="//w.soundcloud.com/player/?url=/' + escape(t[1]) + '&show_artwork=false" frameborder="0"></iframe>');
            } catch (e) {
                console.log(e);
            }
        }
        return s;
    },
    'video': function (s, t) {
        if (t.charAt(0) !== '/') {
            try {
                t = t.split('="');
                t[1] = t[1].replace('"', '');
                s = s.replace('[video="' + t[1] + '"]', '<video class="chat-video" controls preload="none"><source src="https://' + escape(t[1]) + '"></video>');
            } catch (e) {
                console.log(e);
            }
        }
        return s;
    }
};

const TagParser = (s) => {
    s = escape(s);
    let t = s.match(/\[([^\[\];]*)\]/g);
    let tg = '';
    if (!t) return s;
    for (let i = 0; i < t.length; i++) {
        tg = t[i].match(/\[\/?([^\[\]]*)\]/)[1];
        try {
            tg = tg.split('="')[0];
        } catch (e) {
            console.log(e);
        }
        if (typeof ChatTags[tg] !== 'undefined') {
            s = ChatTags[tg](s, t[i].replace('[', '').replace(']', ''));
        }
    }
    return s;
};

export default TagParser;