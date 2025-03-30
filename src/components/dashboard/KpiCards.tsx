import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { cn } from "@/lib/utils";
import { ArrowDownIcon, ArrowUpIcon, DollarSignIcon } from "lucide-react";

interface KpiCardProps {
  title: string;
  value: string;
  change?: {
    value: string;
    type: "increase" | "decrease";
    percentage: string;
  };
  period?: string;
  icon?: React.ReactNode;
  status?: "green" | "yellow" | "red";
  description?: string;
}

const KpiCard = ({
  title = "Revenue",
  value = "₱24,780",
  change = { value: "₱2,430", type: "increase", percentage: "12%" },
  period = "MTD",
  icon = <DollarSignIcon className="h-4 w-4 text-muted-foreground" />,
  status = "green",
  description = "Monthly target",
}: KpiCardProps) => {
  const statusColors = {
    green: "bg-green-100 text-green-800 border-green-200",
    yellow: "bg-yellow-100 text-yellow-800 border-yellow-200",
    red: "bg-red-100 text-red-800 border-red-200",
  };

  return (
    <Card className="bg-white border shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-bold text-gray-700">
          {title}
        </CardTitle>
        <span className="text-xs font-medium text-gray-500">{period}</span>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-2">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-gray-900">{value}</span>
            {status && (
              <span
                className={cn(
                  "ml-2 rounded-full px-2 py-0.5 text-xs font-medium border",
                  statusColors[status],
                )}
              >
                {status === "green"
                  ? "Low Risk"
                  : status === "yellow"
                    ? "Moderate Risk"
                    : "High Risk"}
              </span>
            )}
          </div>

          {change && (
            <div className="flex items-center space-x-1">
              {change.type === "increase" ? (
                <ArrowUpIcon className="h-4 w-4 text-green-500" />
              ) : (
                <ArrowDownIcon className="h-4 w-4 text-red-500" />
              )}
              <span
                className={`text-xs font-medium ${change.type === "increase" ? "text-green-500" : "text-red-500"}`}
              >
                {change.value} ({change.percentage})
              </span>
            </div>
          )}

          <p className="text-xs text-gray-500">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
};

interface KpiCardsProps {
  cards?: KpiCardProps[];
}

const KpiCards = ({ cards }: KpiCardsProps) => {
  const defaultCards: KpiCardProps[] = [
    {
      title: "Revenue",
      value: "₱124,780",
      change: { value: "₱12,430", type: "increase", percentage: "12%" },
      period: "MTD",
      icon: <DollarSignIcon className="h-4 w-4 text-muted-foreground" />,
      description: "Monthly target: ₱150,000",
    },
    {
      title: "Expenses",
      value: "₱86,230",
      change: { value: "₱5,230", type: "increase", percentage: "8%" },
      period: "MTD",
      icon: <DollarSignIcon className="h-4 w-4 text-muted-foreground" />,
      description: "Monthly budget: ₱90,000",
    },
    {
      title: "Profit",
      value: "₱38,550",
      change: { value: "₱7,200", type: "increase", percentage: "23%" },
      period: "MTD",
      icon: <DollarSignIcon className="h-4 w-4 text-muted-foreground" />,
      description: "Monthly target: ₱45,000",
    },
    {
      title: "Outstanding Payables",
      value: "₱42,650",
      period: "Current",
      status: "yellow",
      description: "31-60 days: moderate risk",
    },
    {
      title: "Outstanding Receivables",
      value: "₱78,320",
      period: "Current",
      status: "red",
      description: "61-90 days: high risk",
    },
  ];

  const displayCards = cards || defaultCards;

  return (
    <div className="w-full bg-[#F0F0F0] p-4 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {displayCards.map((card, index) => (
          <KpiCard key={index} {...card} />
        ))}
      </div>
    </div>
  );
};

export default KpiCards;
