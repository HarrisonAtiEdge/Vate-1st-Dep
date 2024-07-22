$step = 1;
$loops = Math.round(100 / $step);
$increment = 360 / $loops;
$half = Math.round($loops / 2);
$barColor = '#009444';
$backColor = '#f0fcf4';
$audio = new Audio('../sound/NewTimer15-Sec.mp3');
$(function(){
    clock.init();
});

var clock = {
    interval: null,
    remainingTime: 15,
    init: function(){
        $('.input-btn').click(function(){
            switch($(this).data('action')){
                case 'start':
                    clock.stop();
                    clock.start(clock.remainingTime);
                    $audio.play(); // Play audio when the timer starts
                    $('.input-btn[data-action="start"]').hide();
                    $('.input-btn[data-action="pause"], .input-btn[data-action="reset"]').show();
                    break;
                case 'pause':
                    clock.pause();
                    $audio.pause(); // Pause audio when the timer is paused
                    $('.input-btn[data-action="start"]').show();
                    $('.input-btn[data-action="pause"]').hide();
                    break;
                case 'reset':
                    clock.reset();
                    break;
            }
        });
    },
    start: function(t){
        $('.count').text("Time's Up").css('font-size', '5rem');
        $('.count').text("Time's Up").css('top', '15px');
        var pie = 0;
        var num = 0;
        var sec = t ? t : 15;
        var lop = sec;
        $('.count').text(sec).addClass('sec');
        clock.interval = setInterval(function(){
            sec = sec - 1;
            pie = pie + (100 / lop);
            clock.remainingTime = sec;
            if (pie >= 101) { pie = 1; }
            $('.count').text(sec);
            $i = (pie.toFixed(2).slice(0, -3)) - 1;
            if ($i < $half) {
                $nextdeg = (90 + ($increment * $i)) + 'deg';
                $('.clock').css({'background-image': 'linear-gradient(90deg,' + $backColor + ' 50%,transparent 50%,transparent),linear-gradient(' + $nextdeg + ',' + $barColor + ' 50%,' + $backColor + ' 50%,' + $backColor + ')'});
            } else {
                $nextdeg = (-90 + ($increment * ($i - $half))) + 'deg';
                $('.clock').css({'background-image': 'linear-gradient(' + $nextdeg + ',' + $barColor + ' 50%,transparent 50%,transparent),linear-gradient(270deg,' + $barColor + ' 50%,' + $backColor + ' 50%,' + $backColor + ')'});
            }
            if (sec == 0) {
                clearInterval(clock.interval);
                $('.count').text("Time's Up");
                $('.clock').removeAttr('style');
                $('.count').text("Time's Up").css('font-size', '30px');
                $('.count').text("Time's Up").css('top', '2px');
                $('.input-btn[data-action="start"]').show();
                $('.input-btn[data-action="pause"], .input-btn[data-action="reset"]').hide();
                $audio.pause(); // Stop audio when the timer ends
                $audio.currentTime = 0; // Reset audio to the beginning
            }
        }, 1000);
    },
    pause: function(){
        clearInterval(clock.interval);
    },
    stop: function(){
        clearInterval(clock.interval);
        $('.count').text(15);
        clock.remainingTime = 15;
        $('.clock').removeAttr('style');
        $('.input-btn[data-action="start"]').show();
        $('.input-btn[data-action="pause"], .input-btn[data-action="reset"]').hide();
        $audio.pause(); // Pause audio when the timer stops
        $audio.currentTime = 0; // Reset audio to the beginning
    },
    reset: function(){
        clock.stop();
        $('.count').text(15);
        $('.clock').removeAttr('style');
    }
}


