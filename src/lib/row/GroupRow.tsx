import * as React from 'react'
import { Component, MouseEventHandler } from 'react'
import PreventClickOnDrag from '../interaction/PreventClickOnDrag'

interface GroupRowProps<T> {
  onClick: MouseEventHandler<HTMLDivElement>
  onDoubleClick?: MouseEventHandler<HTMLDivElement>
  onContextMenu?: MouseEventHandler<HTMLDivElement>
  isEvenRow?: boolean
  style?: React.CSSProperties
  clickTolerance?: number | undefined
  group: T
  dropInRow?: (e: React.DragEvent, group: T, transferData: string) => void
  dragOverRow?: (e: React.DragEvent, group: T) => void
  horizontalLineClassNamesForGroup?: (group: T) => string[]
  positionId: number
  dragEnterRow: (e: React.DragEvent, group: T, transferData: string) => void
  dragLeaveRow: (e: React.DragEvent, group: T, transferData: string) => void
  groupTop: number
}

class GroupRow<T> extends Component<GroupRowProps<T>> {
  render() {
    const {
      onContextMenu,
      onDoubleClick,
      isEvenRow,
      style,
      onClick,
      clickTolerance,
      horizontalLineClassNamesForGroup,
      group,
      dragOverRow,
      dropInRow,
      positionId,
      dragEnterRow,
      dragLeaveRow,
      groupTop,
    } = this.props

    let classNamesForGroup: string[] = []
    if (horizontalLineClassNamesForGroup) {
      classNamesForGroup = horizontalLineClassNamesForGroup(group)
    }

    return <>
      <PreventClickOnDrag clickTolerance={clickTolerance} onClick={onClick}>
        <div
          data-group-id={positionId}
          data-group-top={groupTop}
          onContextMenu={onContextMenu}
          onDoubleClick={onDoubleClick}
          className={"rct-hl " + (isEvenRow ? 'rct-hl-even ' : 'rct-hl-odd ') + (classNamesForGroup ? classNamesForGroup.join(' ') : '')}
          style={style}

          onDragOver={(e) => {
            if (dragOverRow)
              dragOverRow(e, group, e.dataTransfer.getData("text"))
          }}
          onDragEnter={(e) => {
            if (dragEnterRow)
              dragEnterRow(e, group, e.dataTransfer.getData("text"))
          }}
          onDragLeave={(e) => {
            if (dragLeaveRow)
              dragLeaveRow(e, group, e.dataTransfer.getData("text"))
          }}
          onDrop={(e) => {
            if (dropInRow)
              dropInRow(e, group, e.dataTransfer.getData("text"))
          }}
        />
      </PreventClickOnDrag>
    </>
  }
}

export default GroupRow
