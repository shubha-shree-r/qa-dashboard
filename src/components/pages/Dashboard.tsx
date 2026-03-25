import { PieChart, BarChart, Activity } from 'lucide-react';
import '../../assets/styles/Dashboard.css'

interface PieChartDataItem {
    value: number;
    color: string;
}

function Dashboard() {

    // Sample data for three different pie charts
    const uiData = [
        { value: 60, color: '#ef4444'},
        {value: 40, color: '#10b981'}
    ];

    const apiData = [
        { value: 30, color: '#ef4444'},
        {value: 70, color: '#10b981'}
    ];

    // Overall data (sum of UI + API)
    const overallData = [
        {

            value: Math.round((uiData[0].value + apiData[0].value) / 2),
            color: '#ef4444'
        },
        {

            value: Math.round((uiData[1].value + apiData[1].value) / 2),
            color: '#10b981'
        }
    ];
    const CustomPieChart = ({data, size = 200}: {data: PieChartDataItem[], size?: number}) => {
        const center = size / 2;
        const radius = size / 2 - 20;
        const explodeOffset = 6; // Reduced distance for closer slices
        let currentAngle = 0;

        const createPath = (startAngle: number, endAngle: number) => {
            const start = polarToCartesian(center, center, radius, endAngle);
            const end = polarToCartesian(center, center, radius, startAngle);
            const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

            return [
                "M", center, center,
                "L", start.x, start.y,
                "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y,
                "Z"
            ].join(" ");
        };

        const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
            const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
            return {
                x: centerX + (radius * Math.cos(angleInRadians)),
                y: centerY + (radius * Math.sin(angleInRadians))
            };
        };

        // Create lighter gradient colors for 3D effect
        const getGradientId = (color: string, index: number) => `gradient-${color.replace('#', '')}-${index}`;
        const lightenColor = (color: string, percent: number) => {
            const num = parseInt(color.replace('#', ''), 16);
            const r = Math.min(255, ((num >> 16) & 0xff) + Math.round(255 * percent));
            const g = Math.min(255, ((num >> 8) & 0xff) + Math.round(255 * percent));
            const b = Math.min(255, (num & 0xff) + Math.round(255 * percent));
            return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
        };

        return (
            <div className="pie-chart-container">
                <svg width={size} height={size} className="pie-chart">
                    <defs>
                        {data.map((item: PieChartDataItem, idx: number) => {
                            const lightColor = lightenColor(item.color, 0.3);
                            const midColor = lightenColor(item.color, 0.15);
                            return (
                                <linearGradient key={`grad-${idx}`} id={getGradientId(item.color, idx)} x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor={lightColor} stopOpacity="1" />
                                    <stop offset="50%" stopColor={item.color} stopOpacity="1" />
                                    <stop offset="100%" stopColor={midColor} stopOpacity="1" />
                                </linearGradient>
                            );
                        })}
                        <filter id="shadow3d">
                            <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
                            <feOffset dx="2" dy="2" result="offsetblur"/>
                            <feComponentTransfer>
                                <feFuncA type="linear" slope="0.3"/>
                            </feComponentTransfer>
                            <feMerge>
                                <feMergeNode/>
                                <feMergeNode in="SourceGraphic"/>
                            </feMerge>
                        </filter>
                    </defs>
                    {data.map((item: PieChartDataItem, idx: number) => {
                        const angle = (item.value / 100) * 360;
                        const prevAngle = currentAngle;
                        const midAngle = prevAngle + angle / 2;
                        currentAngle += angle;

                        // Calculate offset direction based on middle angle of slice (pizza slice effect)
                        const angleInRadians = (midAngle - 90) * Math.PI / 180.0;
                        const offsetX = Math.cos(angleInRadians) * explodeOffset;
                        const offsetY = Math.sin(angleInRadians) * explodeOffset;

                        // Create path (centered, will be moved by transform)
                        const path = createPath(prevAngle, prevAngle + angle);

                        // Calculate label position (on the slice, accounting for offset)
                        const labelPos = polarToCartesian(center, center, radius * 0.75, midAngle);

                        return (
                            <g key={idx} transform={`translate(${offsetX}, ${offsetY})`} filter="url(#shadow3d)">
                                <path
                                    d={path}
                                    fill={`url(#${getGradientId(item.color, idx)})`}
                                    stroke="#fff"
                                    strokeWidth="2"
                                    className="pie-slice pie-slice-3d"
                                />
                                <text
                                    x={labelPos.x}
                                    y={labelPos.y}
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                    fill="#fff"
                                    fontSize="14"
                                    fontWeight="700"
                                    style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}
                                >
                                    {item.value}%
                                </text>
                            </g>
                        );
                    })}
                </svg>

            </div>
        );
    };
    
    return (
        <div>
            {/* <div className="observability-container">
                <div className="observability-header">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">System Observability</h1>
                    <p className="text-gray-600 mb-6">Real-time system performance metrics</p>
                </div>

                <div className="metrics-grid">
                    <div className="metric-card">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">Resource Usage Distribution</h3>
                        <div className="chart-container">
                            <ResponsiveContainer width="100%" height={300}>
                                <RechartsPieChart>
                                    <Pie
                                        data={pieChartData}
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={100}
                                        fill="#8884d8"
                                        dataKey="value"
                                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                    >
                                        {pieChartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip formatter={(value) => [`${value}%`, 'Usage']} />
                                    <Legend />
                                </RechartsPieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="stats-grid">
                        <div className="stat-card">
                            <div className="stat-icon cpu">
                                <Activity size={24} />
                            </div>
                            <div className="stat-info">
                                <h4>CPU Usage</h4>
                                <p>35%</p>
                            </div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-icon memory">
                                <BarChart size={24} />
                            </div>
                            <div className="stat-info">
                                <h4>Memory</h4>
                                <p>25%</p>
                            </div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-icon disk">
                                <PieChart size={24} />
                            </div>
                            <div className="stat-info">
                                <h4>Disk Usage</h4>
                                <p>20%</p>
                            </div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-icon network">
                                <Activity size={24} />
                            </div>
                            <div className="stat-info">
                                <h4>Network</h4>
                                <p>15%</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
            <div className="observability-container">
            <div className="observability-header">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">System Observability</h1>
                <p className="text-gray-600 mb-6">Real-time system performance metrics</p>
            </div>
            <div className="row metrics-grid">
                <div className="metric-card">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">UI Testing Coverage</h3>
                    <CustomPieChart data={uiData} size={250} />

                    {/*<div className="chart-stats">*/}
                    {/*    <div className="stat-item">*/}
                    {/*        <span className="stat-label">Manual Tests:</span>*/}
                    {/*        <span className="stat-value">{uiData[0].value}%</span>*/}
                    {/*    </div>*/}
                    {/*    <div className="stat-item">*/}
                    {/*        <span className="stat-label">Automated Tests:</span>*/}
                    {/*        <span className="stat-value">{uiData[1].value}%</span>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>

                <div className="metric-card">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">API Testing Coverage</h3>
                    <CustomPieChart data={apiData} size={250} />
                    {/*<div className="chart-stats">*/}
                    {/*    <div className="stat-item">*/}
                    {/*        <span className="stat-label">Manual Tests:</span>*/}
                    {/*        <span className="stat-value">{apiData[0].value}%</span>*/}
                    {/*    </div>*/}
                    {/*    <div className="stat-item">*/}
                    {/*        <span className="stat-label">Automated Tests:</span>*/}
                    {/*        <span className="stat-value">{apiData[1].value}%</span>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>

                <div className="metric-card overall-card">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Overall Testing Coverage</h3>
                    <CustomPieChart data={overallData} size={280} />
                    {/*<div className="chart-stats">*/}
                    {/*    <div className="stat-item">*/}
                    {/*        <span className="stat-label">Manual Tests:</span>*/}
                    {/*        <span className="stat-value">{overallData[0].value}%</span>*/}
                    {/*    </div>*/}
                    {/*    <div className="stat-item">*/}
                    {/*        <span className="stat-label">Automated Tests:</span>*/}
                    {/*        <span className="stat-value">{overallData[1].value}%</span>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    {/*<div className="overall-summary">*/}
                    {/*    <p className="summary-text">*/}
                    {/*        Combined coverage across UI ({uiData[0].value}% + {uiData[1].value}%)*/}
                    {/*        and API ({apiData[0].value}% + {apiData[1].value}%) testing*/}
                    {/*    </p>*/}
                    {/*</div>*/}
                </div>
            </div>
            <div className="row metrics-grid">
                {/* UI Testing Coverage Stats */}
                <div className="stats-grid">
                    <div className="stat-card">
                        <div className="stat-icon" style={{ background: uiData[0].color }}>
                            <PieChart size={24} />
                        </div>
                        <div className="stat-info">
                            <h4>Manual</h4>
                            <p>{uiData[0].value}%</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon" style={{ background: uiData[1].color }}>
                            <PieChart size={24} />
                        </div>
                        <div className="stat-info">
                            <h4>Automation</h4>
                            <p>{uiData[1].value}%</p>
                        </div>
                    </div>
                </div>

                {/* API Testing Coverage Stats */}
                <div className="stats-grid">
                    <div className="stat-card">
                        <div className="stat-icon" style={{ background: apiData[0].color }}>
                            <BarChart size={24} />
                        </div>
                        <div className="stat-info">
                            <h4>Manual</h4>
                            <p>{apiData[0].value}%</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon" style={{ background: apiData[1].color }}>
                            <BarChart size={24} />
                        </div>
                        <div className="stat-info">
                            <h4>Automation</h4>
                            <p>{apiData[1].value}%</p>
                        </div>
                    </div>
                </div>

                {/* Overall Testing Coverage Stats */}
                <div className="stats-grid">
                    <div className="stat-card">
                        <div className="stat-icon" style={{ background: overallData[0].color }}>
                            <Activity size={24} />
                        </div>
                        <div className="stat-info">
                            <h4>Manual</h4>
                            <p>{overallData[0].value}%</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon" style={{ background: overallData[1].color }}>
                            <Activity size={24} />
                        </div>
                        <div className="stat-info">
                            <h4>Automation</h4>
                            <p>{overallData[1].value}%</p>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
}

export default Dashboard;

