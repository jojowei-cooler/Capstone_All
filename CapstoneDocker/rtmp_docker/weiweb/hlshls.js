if (Hls.isSupported()) {
  alert('Hls is available!!!');
  const video1 = document.getElementById("video1");
  const video2 = document.getElementById("video2");
  const hls1 = new Hls();
  const hls2 = new Hls();

  hls1.attachMedia(video1);
  hls2.attachMedia(video2);

  hls1.on(Hls.Events.MEDIA_ATTACHED, function() {
    console.log("video and hls1.js are now bound together!!!");
    hls1.loadSource(
      "http://192.168.43.114:8080/hls1/stream.m3u8"
    );
  });

  hls2.on(Hls.Events.MEDIA_ATTACHED, function() {
    console.log("video and hls2.js are now bound together!!!");
    hls2.loadSource(
      "http://192.168.43.114:8080/hls2/stream.m3u8"
    );
  });
}