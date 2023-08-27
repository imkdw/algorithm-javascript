import { getToken } from "firebase/messaging";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { messaging } from "../../firebase/firebase";

const StyledAlarm = styled.div`
  width: 30%;
  height: 100%;
  display: flex;
  border: 1px solid blue;
`;

const Alarm = () => {
  const [alarms, setAlarms] = useState<any[]>([]);

  useEffect(() => {
    const eventSource = new EventSource("http://localhost:4000/alarm?userId=dongwoo");

    eventSource.onopen = () => {};

    eventSource.onmessage = async (e) => {
      const res = await e.data;
      const parsedData = JSON.parse(res);
      setAlarms((prev) => [...prev, parsedData]);
    };

    eventSource.onerror = (e: any) => {
      eventSource.close();
      if (e.error) console.error("EventSource failed:", e.error);
    };
  });
  return (
    <StyledAlarm>
      {alarms.map((alarm) => {
        return (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div>{alarm.title}</div>;<div>{alarm.body}</div>;
          </div>
        );
      })}
    </StyledAlarm>
  );
};

export default Alarm;
