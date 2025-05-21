import React, { Component } from 'react'
import GroupRow from './GroupRow'

export type RowClickEvent = (evt: React.MouseEvent<HTMLDivElement>, index: number) => void

export interface GroupRowsProps<T> {
  canvasWidth: number
  lineCount: number
  groupHeights: number[]
  onRowClick: RowClickEvent
  onRowDoubleClick: RowClickEvent
  clickTolerance?: number
  groups: T[]
  horizontalLineClassNamesForGroup?: (group: T) => string[]
  onRowContextClick: RowClickEvent

  groupTops: number[]

  dropInRow?: (e: React.DragEvent, group: T, transferData: string) => void,
  dragOverRow?: (e: React.DragEvent, group: T, transferData: string) => void,
  dragEnterRow?: (e: React.DragEvent, group: T, transferData: string) => void,
  dragLeaveRow?: (e: React.DragEvent, group: T, transferData: string) => void,
}

export default class GroupRows<T> extends Component<GroupRowsProps<T>> {
  shouldComponentUpdate(nextProps: GroupRowsProps<T>) {
    return !(
      nextProps.canvasWidth === this.props.canvasWidth &&
      nextProps.lineCount === this.props.lineCount &&
      nextProps.groupHeights === this.props.groupHeights &&
      nextProps.groups === this.props.groups
    )
  }

  render() {
    const {
      canvasWidth,
      lineCount,
      groupHeights,
      onRowClick,
      onRowDoubleClick,
      clickTolerance,
      groups,
      horizontalLineClassNamesForGroup,
      onRowContextClick,
      dragOverRow,
      dropInRow,
      dragEnterRow,
      dragLeaveRow,
      groupTops
    } = this.props
    const lines: React.ReactNode[] = []

    for (let i = 0; i < lineCount; i++) {
      lines.push(
        <GroupRow
          positionId={i}
          groupTop={groupTops[i]}

          clickTolerance={clickTolerance}
          onContextMenu={(evt) => onRowContextClick(evt, i)}
          onClick={(evt) => onRowClick(evt, i)}
          onDoubleClick={(evt) => onRowDoubleClick(evt, i)}
          key={`horizontal-line-${i}`}
          isEvenRow={i % 2 === 0}
          group={groups[i]}

          dragOverRow={dragOverRow}
          dropInRow={dropInRow}
          dragEnterRow={dragEnterRow}
          dragLeaveRow={dragLeaveRow}

          horizontalLineClassNamesForGroup={horizontalLineClassNamesForGroup}
          style={{
            width: `${canvasWidth}px`,
            height: `${groupHeights[i]}px`,
          }}
        />,
      )
    }

    return <div className="rct-horizontal-lines">{lines}</div>
  }
}
