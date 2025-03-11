	//	 \(^Д^)/		//
	//		 (ノ>Д<)ノ	//
	//	 \(^Д^)/		//
	//		 (ノ>Д<)ノ	//

function loadJSON(url, async = false)
{
	const xhr = new XMLHttpRequest();
	xhr.open("GET", url, async); // false makes it synchronous
	xhr.send(null);
	
	if (xhr.status === 200) { return JSON.parse(xhr.responseText); } else {
		throw new Error("Synchronous load failed: " + xhr.statusText); }
}
const data = loadJSON("vb_data.json");

if (!data.length) { throw new Error('NO VOICEBANKS FOUND!'); }

const play__icon = '>';
const pause_icon = '~';
const stop__icon = '|';

const grid_VB = Array.from({ length: data.length }, () => create_elem('div', 'MAIN', "", 'grid_VB'));
for (var i = 0; i < grid_VB.length; i++)
{
	var val = data[i];
	val.audio_cursor = 0;
	
	const grid_VB_SEPR_0 = create_elem('div', 'SEPR_1', "", 'grid_VB_SEPR');
	grid_VB[i].appendChild(grid_VB_SEPR_0);

	if (val.name.length)
	{
		const grid_VB_NAME = create_elem('div', 'NAME', "", 'grid_VB_NAME');
		var __title = create_elem('p', 'title', "<b>" + val.name, 'skewed t-sL t-c1 t-w9 t-f1', 'position: absolute; transform: translateY(-50%);');

		grid_VB_NAME.appendChild(__title);
		grid_VB[i].appendChild(grid_VB_NAME);
	}
	if (val.desc.length)
	{
		const grid_VB_DESC = create_elem('div', 'DESC', "", 'grid_VB_DESC');
		var __desc = create_elem('div', 'desc', val.desc, 't-aC t-sM t-c1 t-w1 t-f1');

		grid_VB_DESC.appendChild(__desc);
		grid_VB[i].appendChild(grid_VB_DESC);
		grid_VB[i].appendChild(create_elem('div', 'DSEP', "", '', 'position: relative; height: min(1.1vw, 1.1vh);'));
	}
	if (is_dictionary(val.recording) >= 3)
	{
		const grid_VB_DATA = create_elem('div', 'DATA', "", 'grid_VB_DATA');

		const grid_VB_LANG = create_elem('div', 'LANG', "", 'grid_VB_LANG');
		const grid_VB_RECM = create_elem('div', 'RECM', "", 'grid_VB_RECM');
		const grid_VB_SOFT = create_elem('div', 'SOFT', "", 'grid_VB_SOFT');
		
		const __language = create_elem('p', 'language', "<b>Language</b><br>> " + val.recording.language + " <", 't-aC t-sM t-c1 t-w1 t-f1');
		const __method = create_elem('p', 'method', "<b>Record Method</b><br>> " + val.recording.method + " <", 't-aC t-sM t-c1 t-w1 t-f1');
		const __software = create_elem('p', 'software', "<b>Software</b><br>> " + val.recording.software + " <", 't-aC t-sM t-c1 t-w1 t-f1');
		
		grid_VB_LANG.appendChild(__language);
		grid_VB_RECM.appendChild(__method);
		grid_VB_SOFT.appendChild(__software);

		grid_VB_DATA.appendChild(create_elem('div', 'DSEP', "", '', 'position: relative; top: min(1.5vw, 1.5vh); height: min(.4vw, .4vh); background-color:rgba(255, 255, 255, 0.25);'));

		grid_VB_DATA.appendChild(grid_VB_LANG);
		grid_VB_DATA.appendChild(grid_VB_RECM);
		grid_VB_DATA.appendChild(grid_VB_SOFT);
		grid_VB_DATA.appendChild(create_elem('div', 'RLTV', "", 'grid_VB_LANG', 'position: relative;'));

		grid_VB_DATA.appendChild(create_elem('div', 'DSEP', "", '', 'position: relative; top: max(-1.5vw, -1.5vh); height: min(.4vw, .4vh); background-color:rgba(255, 255, 255, 0.25);'));

		grid_VB[i].appendChild(grid_VB_DATA);

		const __append_D = val.recording.pitch_append;
		const __append_L = is_dictionary(__append_D);
		var __pitch_A = [];
		var __pitch_L = 0;
		if (__append_L > 0)
		{
			const grid_VB_PTAB = create_elem('div', 'PTAB', "", 'grid_VB_PTAB');
			const __append_K = Object.keys(__append_D);

			var grid_VB_APPEND = [];
			for (var j = 0; j < __append_L; j++)
			{
				__pitch_A = __append_D[__append_K[j]];
				__pitch_L = __pitch_A.length;

				const __append_name_size = 110/3;

				if (!j)
				{
					grid_VB_SHOWDATA_0 = create_elem('div', 'showdata_0', "<b>Appends", 't-aC t-sM t-c1 t-w1 t-f1', 'position: absolute; left: 0%; --wid: ' + __append_name_size + '; --hei: 5; width: calc(var(--wid) * 1%); height: calc(var(--hei) * min(1vw, 1vh));');
					grid_VB_PTAB.appendChild(grid_VB_SHOWDATA_0);

					if (__pitch_L > 0)
					{
						grid_VB_SHOWDATA_0.appendChild(create_elem('div', 'DSEP', "", '', 'position: relative; height: 100%; left: 100%; width: min(.2vw, .2vh); transform: translate(-50%, -80%); background-color:rgba(255, 255, 255, 0.25);'));
						grid_VB_SHOWDATA_1 = create_elem('div', 'showdata_1', "<b>Pitches", 't-aC t-sM t-c1 t-w1 t-f1', 'position: relative; left: ' + __append_name_size + '%; --wid: ' + (100 - __append_name_size) + '; --hei: 5; width: calc(var(--wid) * 1%); height: calc(var(--hei) * min(1vw, 1vh));');
						grid_VB_PTAB.appendChild(grid_VB_SHOWDATA_1);
					}
				}
				grid_VB_APPEND[j] = [];
				grid_VB_APPEND[j][0] = create_elem('div', 'append_' + j, __append_K[j], 't-aC t-sM t-c1 t-w1 t-f1', 'position: ' + ((0 == __pitch_L) ? 'relative' : 'absolute') + '; left: 0%; --wid: ' + __append_name_size + '; --hei: 5; width: calc(var(--wid) * 1%); height: calc(var(--hei) * min(1vw, 1vh));');
				grid_VB_PTAB.appendChild(grid_VB_APPEND[j][0]);
				
				if (0 != __pitch_L) grid_VB_APPEND[j][0].appendChild(create_elem('div', 'DSEP', "", '', 'position: relative; height: 100%; left: 100%; width: min(.2vw, .2vh); transform: translate(-50%, -80%); background-color:rgba(255, 255, 255, 0.25);'));

				for (var l = 1; l <= __pitch_L; l++)
				{
					grid_VB_APPEND[j][l] = create_elem('div', 'append_' + j + '_pitch_' + l - 1, __pitch_A[l - 1], 't-aC t-sM t-c1 t-w1 t-f1', 'position: ' + ((l == __pitch_L) ? 'relative' : 'absolute') + '; left: ' + (__append_name_size + ((l) / (__pitch_L + 2) * (100 - __append_name_size))) + '%; --wid: ' + ((100 - __append_name_size) / (__pitch_L + 1)) + '; --hei: 5; width: calc(var(--wid) * 1%); height: calc(var(--hei) * min(1vw, 1vh));');
					
					grid_VB_PTAB.appendChild(grid_VB_APPEND[j][l]);
				}
			}
			grid_VB_PTAB.appendChild(create_elem('div', 'DSEP', "", '', 'position: relative; height: min(1.1vw, 1.1vh);'));
			grid_VB[i].appendChild(grid_VB_PTAB);
		}
	}
	if (val.video.length)
	{
		grid_VB[i].appendChild(create_elem('div', 'DSEP', "", '', 'position: relative; height: min(1.1vw, 1.1vh);'));

		const grid_VB_EMBD = create_elem('div', 'EMBD', "", 'grid_VB_EMBD debug_border1');
		const grid_VB_VIDC = create_elem('div', 'VIDC', "", 'debug_border2', 'position: absolute; left: calc(100% - calc(var(--hei) * min(16vw, 16vh) / 9)); width: calc(var(--hei) * min(16vw, 16vh) / 9); height: calc(var(--hei) * min(1vw, 1vh));');

		var grid_VB_VID = [];

		grid_VB_VID[0] = create_elem('iframe', 'VID0', "", "", "border: none; padding: 0; margin: 0;", "100%", "100%", "https://www.youtube.com/embed/" + val.video[0].video_id);
		grid_VB_VID[0].frameborder = "0";

		grid_VB_VIDC.appendChild(grid_VB_VID[0]);
		grid_VB_EMBD.appendChild(grid_VB_VIDC);
		grid_VB[i].appendChild(grid_VB_EMBD);
	}
	if (val.link != null && val.link.length && val.link != "SOON" && val.link != "COMING SOON")
	{
		const grid_VB_DOWN = create_elem('div', 'DOWN', "", 'grid_VB_DOWN debug_border2');
		grid_VB[i].appendChild(grid_VB_DOWN);	
	}
	
	const grid_VB_SEPR_1 = create_elem('div', 'SEPR_0', "", 'grid_VB_SEPR');
	grid_VB[i].appendChild(grid_VB_SEPR_1);

	
	document.getElementById("MAIN_VB_CONTAINER").appendChild(create_elem('div', 'SEPR_END', "", 'grid_VB_SEPR'));
	document.getElementById("MAIN_VB_CONTAINER").appendChild(grid_VB[i]);
}

function create_elem(type = 'div', id = NaN, text = "", class_name = NaN, style = NaN, width = NaN, height = NaN, src = NaN)
{
	const elem = document.createElement(type);
	if (id != NaN) elem.id = id;
	if (text != "") elem.innerHTML = text;
	if (class_name != NaN) elem.className = class_name;
	if (style != NaN) elem.style = style;
	if (width != NaN) elem.width = width;
	if (height != NaN) elem.height = height;
	if (src != NaN) elem.src = src;
	return elem;
}

function play_audio(voicebank, stop = false)
{
	if (data[voicebank].audio_cursor < 0) return;
	
	const audio = data[voicebank].audio[data[voicebank].audio_cursor].obj;
	if (!stop)
	{
		if (audio.paused)
		{
			grid_VB[voicebank].querySelector("#play").innerHTML = pause_icon;
			audio.play();
		}
		else
		{
			grid_VB[voicebank].querySelector("#play").innerHTML = play__icon;
			audio.pause();
		}
	}
	else
	{
		grid_VB[voicebank].querySelector("#play").innerHTML = play__icon;
		audio.pause();
		audio.currentTime = 0;
	}
};

function change_audio(move, voicebank)
{
	if (!data[voicebank].audio.length || data[voicebank].audio_cursor < 0) return;
	data[voicebank].audio[data[voicebank].audio_cursor].obj.pause();
	data[voicebank].audio_cursor = (data[voicebank].audio_cursor + move) % data[voicebank].audio.length;
	if (data[voicebank].audio_cursor < 0) data[voicebank].audio_cursor += data[voicebank].audio.length;
	grid_VB[voicebank].querySelector("#name").innerHTML = data[voicebank].audio[data[voicebank].audio_cursor].name
	grid_VB[voicebank].querySelector("#play").innerHTML = play__icon;
}

function compress_size(size) { return size / Math.pow(1000, Math.floor(Math.log10(size) / 3)) + ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"][Math.floor(Math.log10(size) / 3)]; }

function is_dictionary(obj) { return (typeof obj === 'object' && obj !== null && !Array.isArray(obj)) ? Object.keys(obj).length : -1; }