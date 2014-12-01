Ext.require(['Ext.data.*', 'Ext.grid.*', 'Ext.toolbar.Paging', 'Ext.grid.filters.Filters', 'Ext.util.Sorter']);

Ext.define('Person', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'id',
        type: 'int',
        useNull: true
    }, 'STU_EMAIL', 'STU_NAME', 'last'],
    validations: [{
        type: 'length',
        field: 'STU_EMAIL',
        min: 1
    }, {
        type: 'length',
        field: 'STU_NAME',
        min: 1
    }, {
        type: 'length',
        field: 'last',
        min: 1
    }]
});

Ext.onReady(function(){

    var store = Ext.create('Ext.data.Store', {
        autoLoad: true,
        autoSync: true,
        model: 'Person',
        remoteSort: true,
        sorters: 'id',
        pageSize: 4,
        proxy: {
            type: 'ajax',
            url: 'app/students',
            reader: {
                type: 'json',
                rootProperty: 'data',
                totalProperty: 'total'
            },
            writer: {
                type: 'json'
            }
        },
        listeners: {
            write: function(store, operation){
                var record = operation.getRecords()[0],
                    name = Ext.String.capitalize(operation.action),
                    verb;


                if (name == 'Destroy') {
                    verb = 'Destroyed';
                } else {
                    verb = name + 'd';
                }
                Ext.example.msg(name, Ext.String.format("{0} user: {1}", verb, record.getId()));

            }
        }
    });

    var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
        listeners: {
            cancelEdit: function(rowEditing, context) {
                // Canceling editing of a locally added, unsaved record: remove it
                if (context.record.phantom) {
                    store.remove(context.record);
                }
            }
        }
    });

    var grid = Ext.create('Ext.grid.Panel', {
        renderTo: document.body,
        plugins: [rowEditing, 'gridfilters'],
        width: 500,
        height: 330,
        frame: true,
        title: 'Users',
        store: store,
        emptyText: 'No Matching Records',
    loadMask: true,
        iconCls: 'icon-user',
	// paging bar on the bottom
        bbar: Ext.create('Ext.PagingToolbar', {
            store: store,
            displayInfo: true,
            displayMsg: 'Displaying topics {0} - {1} of {2}',
            emptyMsg: "No topics to display"
        }),
        columns: [{
            text: 'ID',
            width: 70,
            sortable: true,
            dataIndex: 'id',
            renderer: function(v, meta, rec) {
                return rec.phantom ? '' : v;
            }
        }, {
            text: 'Email',
            flex: 1,
            sortable: true,
            dataIndex: 'STU_EMAIL',
            field: {
                xtype: 'textfield'
            }
        }, {
            header: 'First',
            width: 120,
            sortable: true,
            dataIndex: 'STU_NAME',
            field: {
                xtype: 'textfield'
            },
            filter: {
            	type: 'string',
            	itemDefaults: {
            		emptyText: 'Search for...'
            	}
            }
        }, {
            text: 'Last',
            width: 120,
            sortable: true,
            dataIndex: 'last',
            field: {
                xtype: 'textfield'
            }
        }],
        dockedItems: [{
            xtype: 'toolbar',
            items: [{
                text: 'Add',
                iconCls: 'icon-add',
                handler: function(){
                    // empty record
                    store.insert(0, new Person());
                    rowEditing.startEdit(0, 0);
                }
            }, '-', {
                itemId: 'delete',
                text: 'Delete',
                iconCls: 'icon-delete',
                disabled: true,
                handler: function(){
                    var selection = grid.getView().getSelectionModel().getSelection()[0];
                    if (selection) {
                        store.remove(selection);
                    }
                }
            }]
        }]
    });
    grid.getSelectionModel().on('selectionchange', function(selModel, selections){
        grid.down('#delete').setDisabled(selections.length === 0);
    });
});