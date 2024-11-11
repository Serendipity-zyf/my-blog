interface StatBarProps {
    label: string
    value: number
    max: number
    color: string
}

export default function StatBar({ label, value, max, color }: StatBarProps) {
    const percentage = Math.min((value / max) * 100, 100)

    return (
        <div className="w-full">
            <div className="flex justify-between mb-1 text-sm">
                <span>{label}</span>
                <span>{value.toLocaleString()}</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full dark:bg-gray-700">
                <div
                    className={`h-2 rounded-full bg-gradient-to-r ${color}`}
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    )
} 