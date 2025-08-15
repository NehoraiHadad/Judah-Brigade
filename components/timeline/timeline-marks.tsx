import React from "react";

interface TimelineMarksProps {
  item: {
    date: string;
  };
  slideWidth: number;
}

const DateDisplay: React.FC<{ dateText: string }> = ({ dateText }) => {
  // Split text into two lines based on content
  if (dateText.includes("לפני הספירה")) {
    const yearPart = dateText.replace(" לפני הספירה", "");
    return (
      <>
        <div>{yearPart}</div>
        <div>לפני הספירה</div>
      </>
    );
  } else if (dateText.includes("לספירה")) {
    const parts = dateText.split(" לספירה");
    return (
      <>
        <div>{parts[0]}</div>
        <div>לספירה</div>
      </>
    );
  } else if (dateText.includes("עד 70 לספירה")) {
    const parts = dateText.replace(" עד 70 לספירה", "");
    return (
      <>
        <div>{parts}</div>
        <div>עד 70 לספירה</div>
      </>
    );
  } else if (dateText.includes("המנדט הבריטי")) {
    const parts = dateText.replace(" המנדט הבריטי", "");
    return (
      <>
        <div>{parts}</div>
        <div>המנדט הבריטי</div>
      </>
    );
  } else if (dateText.includes("עד מלחמת ששת הימים")) {
    const parts = dateText.replace(" עד מלחמת ששת הימים", "");
    return (
      <>
        <div>{parts}</div>
        <div>עד מלחמת ששת הימים</div>
      </>
    );
  } else if (dateText.includes("עד היום")) {
    const parts = dateText.replace(" עד היום", "");
    return (
      <>
        <div>{parts}</div>
        <div>עד היום</div>
      </>
    );
  } else {
    // For other dates, try to split in the middle
    const words = dateText.split(" ");
    if (words.length > 2) {
      const mid = Math.ceil(words.length / 2);
      const firstPart = words.slice(0, mid).join(" ");
      const secondPart = words.slice(mid).join(" ");
      return (
        <>
          <div>{firstPart}</div>
          <div>{secondPart}</div>
        </>
      );
    } else {
      return <div>{dateText}</div>;
    }
  }
};

export const TimelineMarks: React.FC<TimelineMarksProps> = React.memo(({ 
  item, 
  slideWidth 
}) => {
  return (
    <div className="flex flex-col items-center relative mb-8 sm:mb-0">
      <div
        className="absolute top-0 left-0 right-0 h-0.5"
        style={{ backgroundColor: "#e9e0d3" }}
      />
      {/* Long timeline mark */}
      <div
        style={{
          backgroundColor: "#e9e0d3",
          width: "2px",
          height: "50px",
          marginTop: "-1px",
          zIndex: 1,
        }}
      />
      {/* Multiple short timeline marks between periods */}
      {Array.from({ length: 16 }, (_, markIndex) => (
        <div
          key={markIndex}
          className="absolute"
          style={{
            left: "50%",
            transform: `translateX(${(slideWidth / 17) * (markIndex + 1)}px)`,
            top: "-1px",
          }}
        >
          <div
            style={{
              backgroundColor: "#e9e0d3",
              width: "2px",
              height: "25px",
            }}
          />
        </div>
      ))}
      <div className="mt-2 text-center">
        <div
          className="text-2xl sm:text-xl lg:text-xl xl:text-2xl leading-tight"
          style={{ color: "#d2c2a8" }}
        >
          <DateDisplay dateText={item.date} />
        </div>
      </div>
    </div>
  );
});

TimelineMarks.displayName = "TimelineMarks";