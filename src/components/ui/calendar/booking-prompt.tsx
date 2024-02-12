import { RelativeMousePositionProps } from "@/lib/utils";
import { format, toDate } from "date-fns";
import { useRouter } from "next/navigation";
import { Button } from "../button";
import { DateTimePicker } from "../date-time-picker";
export default function PossibleBooking({dragStart, dragEnd, setRelativeMousePosition, view, startDate, setStartDate, endDate, setEndDate}: {dragStart:RelativeMousePositionProps, dragEnd: RelativeMousePositionProps, setRelativeMousePosition: (e: RelativeMousePositionProps|null) => void, view: "week" | "day", startDate: Date | null, setStartDate: (e: Date) => void, endDate: Date | null, setEndDate: (e: Date) => void} ){
  const router = useRouter();
  function buildUrl() {
    return "booking?start=" + format(startDate!, "PPP HH:mm:ss") + "&end=" + format(endDate!, "PPP HH:mm:ss")+"&type=soundboks";

  }
    return (dragStart && dragEnd &&
        <div
          className="rounded-md absolute bg-neutral-400 shadow-sm border z-10"
          style={{
            top: dragStart.y,
            left: view == "week" ? dragStart.day * (100 / 7) + "%" : "0",

            height: dragEnd.y - dragStart.y,
            width: view == "week" ? 100 / 7 + "%" : "100%",
          }}
        >
          <div className="relative h-full w-full">
            <div
              className="absolute top-full left-0 p-4 border rounded-md w-64 bg-white shadow-sm"
              onMouseDown={(e) => e.stopPropagation()}
              onMouseUp={(e) => e.stopPropagation()}
              onMouseMove={(e) => {
                e.stopPropagation();
                setRelativeMousePosition(null);
              }}
            >
              <div className="text-sm text-neutral-500">Start:</div>
              <DateTimePicker
                value={format(startDate||new Date(), "PPP HH:mm:ss")}
                  className="mb-4 w-full"
                  onChange={(e) =>{ setStartDate(toDate(e.target.value) || new Date())
                    console.log(e.target.value)
                  }}
              />
              <div className="text-sm text-neutral-500">Slutt:</div>
              <DateTimePicker
                  className="mb-4 w-full"
                  value={format(endDate||new Date(), "PPP HH:mm:ss")}
                  onChange={(e)=>setEndDate(toDate(e.target.value) || new Date())}
                />
              <Button className="w-full" onClick={()=>router.push(buildUrl())}>Reserver</Button>
            </div>
          </div>
        </div>
      
    );
  }

