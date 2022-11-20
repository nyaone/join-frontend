// yyyy-MM-ddThh:mm:ss.SSS
const formatTime = (timeStr: string, forHuman?: boolean): string => {
  try {
    const time = new Date(timeStr);
    return `${time.getFullYear().toString()}${forHuman ? '年' : '-'}${time.getMonth().toString().padStart(2, '0')}${
      forHuman ? '月' : '-'
    }${time.getDate().toString().padStart(2, '0')}${forHuman ? '日 ' : 'T'}${time
      .getHours()
      .toString()
      .padStart(2, '0')}:${
      time.getMinutes().toString().padStart(2, '0')
      // }:${
      //   time.getSeconds().toString().padStart(2, '0')
      // }.${
      //   time.getMilliseconds().toString().padStart(3, '0')
    }`;
  } catch (e) {
    console.log('Not time: ', timeStr);
    return '1970-01-01T00:00';
  }
};

export default formatTime;
